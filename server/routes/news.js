
const router = require('express').Router();
const News = require('../models/News');
const multer = require('multer');
const path = require('path');

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

// Create a news article
router.post('/', (req, res) => {
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

// Get all news articles
router.get('/', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single news article by slug
router.get('/:slug', async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (news == null) {
      return res.status(404).json({ message: 'Cannot find news article' });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a news article
// router.put('/:id', upload, async (req, res) => {
//   try {
//     const { title, content } = req.body;
//     const updatedNews = await News.findById(req.params.id);

//     if (!updatedNews) {
//       return res.status(404).json({ message: 'Cannot find news article' });
//     }

//     updatedNews.title = title || updatedNews.title;
//     updatedNews.content = content || updatedNews.content;
//     updatedNews.slug = title ? title.toLowerCase().split(' ').join('-') : updatedNews.slug;

//     if (req.file) {
//       updatedNews.image = `/uploads/${req.file.filename}`;
//     }

//     const savedNews = await updatedNews.save();
//     res.json(savedNews);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// Delete a news article
// router.delete('/:id', async (req, res) => {
//   try {
//     const news = await News.findById(req.params.id);
//     if (news == null) {
//       return res.status(404).json({ message: 'Cannot find news article' });
//     }

//     await News.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Deleted news article' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

router.get('/test', (req, res) => {
  res.send('Test route works!');
});


module.exports = router;
