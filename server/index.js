require('dotenv').config({ path: '.env.local' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');

const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://at.neonecy.com', 'https://flash-deployment-25ak.vercel.app', 'http://localhost:8080', 'http://localhost:8081', 'http://127.0.0.1:8080', 'http://127.0.0.1:8081'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url} (Path: ${req.path})`);
  next();
});

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection with error handling
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });
    
    cachedConnection = connection;
    console.log('MongoDB database connection established successfully');
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Routes
const newsRouter = require('./routes/news');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

app.use('/api/news', newsRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', authMiddleware, adminRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));

// Catch-all handler for SPA routing - use middleware instead of route
app.use((req, res, next) => {
  // Only serve index.html for non-API routes and if no other route matched
  if (!req.path.startsWith('/api/') && !res.headersSent) {
    const indexPath = path.join(__dirname, '..', 'client', 'dist', 'index.html');
    // Check if file exists before serving
    const fs = require('fs');
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ message: 'Frontend not built. Run client build first.' });
    }
  } else if (req.path.startsWith('/api/') && !res.headersSent) {
    res.status(404).json({ message: 'API endpoint not found' });
  } else {
    next();
  }
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// For Vercel serverless function
module.exports = async (req, res) => {
  try {
    await connectToDatabase();
    return app(req, res);
  } catch (error) {
    console.error('Database connection failed:', error);
    return res.status(500).json({ 
      message: 'Database connection failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Service temporarily unavailable'
    });
  }
};

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  
  connectToDatabase().then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  }).catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
}