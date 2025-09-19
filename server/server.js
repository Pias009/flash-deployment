require('dotenv').config({ path: '.env.local' });

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authMiddleware = require('./middleware/authMiddleware');


const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url} (Path: ${req.path})`);
  next();
});
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS configuration
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS ? process.env.CORS_ALLOWED_ORIGINS.split(',') : ['http://localhost:5001'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
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
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
