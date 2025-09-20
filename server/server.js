require('dotenv').config({ path: '.env.local' });

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors'); // Added cors import
const cloudinary = require('cloudinary').v2; // Cloudinary import

const authMiddleware = require('./middleware/authMiddleware');

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url} (Path: ${req.path})`);
  next();
});

// CORS configuration
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(',') : ['http://localhost:8080']; // Uncommented and will use .env
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Routes
const newsRouter = require('./routes/news');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

app.use('/api/news', newsRouter);
app.use('/api/auth', authRouter);
app.use('/api/admin', authMiddleware, adminRouter);


// Serve frontend
app.use(express.static(path.join(__dirname, '..', 'client', 'dist')));



// Catch-all to serve index.html for any unhandled routes
app.get(/^\/(?!api\/).*$/, (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
