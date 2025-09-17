const router = require('express').Router();
const News = require('../models/News');
const multer = require('multer');
const path = require('path');

const authMiddleware = require('../middleware/authMiddleware');
require('dotenv').config();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: function(req, file, cb){
    cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 1000000},
}).single('image');

const adminOnly = (req, res, next) => {
  if (req.user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  next();
};

router.get('/', authMiddleware, adminOnly, (req, res) => {
  res.json({ message: 'Welcome to the admin panel' });
});

// Admin: Create a news article
router.post('/news', authMiddleware, adminOnly, (req, res) => {
  upload(req, res, async (err) => {
    if(err){
      res.status(400).json({ message: err });
    } else {
      const slug = req.body.title.toLowerCase().split(' ').join('-');
      const newNews = new News({
        title: req.body.title,
        content: req.body.content,
        image: req.file ? `/uploads/${req.file.filename}` : null,
        slug: slug,
      });
      try {
        const savedNews = await newNews.save();
        res.status(201).json(savedNews);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  });
});

// Admin: Update a news article
router.put('/news/:id', authMiddleware, adminOnly, (req, res) => {
  upload(req, res, async (err) => {
    if(err){
      res.status(400).json({ message: err });
    } else {
      try {
        const { title, content } = req.body;
        const updatedNews = await News.findById(req.params.id);

        if (!updatedNews) {
          return res.status(404).json({ message: 'Cannot find news article' });
        }

        updatedNews.title = title || updatedNews.title;
        updatedNews.content = content || updatedNews.content;
        updatedNews.slug = title ? title.toLowerCase().split(' ').join('-') : updatedNews.slug;

        if (req.file) {
          updatedNews.image = `/uploads/${req.file.filename}`;
        }

        const savedNews = await updatedNews.save();
        res.json(savedNews);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    }
  });
});

// Admin: Delete a news article
router.delete('/news/:id', authMiddleware, adminOnly, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (news == null) {
      return res.status(404).json({ message: 'Cannot find news article' });
    }

    await News.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted news article' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all news articles
router.get('/news', authMiddleware, adminOnly, async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
