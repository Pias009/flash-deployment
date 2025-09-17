// Simple test server without frontend dependencies
require('dotenv').config({ path: '.env.local' });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authMiddleware = require('./middleware/authMiddleware');

const app = express();

// Middleware
app.use(cors({
  origin: ['https://at.neonecy.com', 'http://localhost:8080', 'http://localhost:8081', 'http://127.0.0.1:8080', 'http://127.0.0.1:8081'],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url} (Path: ${req.path})`);
  next();
});

// MongoDB Connection with error handling
let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) {
    return cachedConnection;
  }

  try {
    const connection = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/test', {
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
    // Don't throw error for testing purposes
    return null;
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
    environment: process.env.NODE_ENV || 'development',
    database: cachedConnection ? 'connected' : 'disconnected'
  });
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is working correctly!' });
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
      console.log(`Test server is running on port: ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
    });
  }).catch((error) => {
    console.error('Failed to connect to database, but starting server anyway:', error);
    app.listen(PORT, () => {
      console.log(`Test server is running on port: ${PORT} (without database)`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
      console.log(`Test endpoint: http://localhost:${PORT}/api/test`);
    });
  });
}