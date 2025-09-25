const router = require("express").Router();
const News = require("../models/News");
const authMiddleware = require("../middleware/authMiddleware");
const { uploadSingle } = require("../middleware/uploadMiddleware");
const { uploadImage } = require("../services/uploadImage");

const adminOnly = (req, res, next) => {
  if (req.user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

router.get("/", authMiddleware, adminOnly, (req, res) => {
  res.json({ message: "Welcome to the admin panel" });
});

// Admin: Create a news article
router.post("/news", authMiddleware, adminOnly, uploadSingle, async (req, res) => {
  const imageFile = req.file;
  let imageUrl = "";

  try {
    if (imageFile) {
      const result = await uploadImage(imageFile.buffer, "news-images");
      if (result.url) imageUrl = result.url;
    }

    const slug = req.body.title.toLowerCase().split(" ").join("-");

    const newNews = await News.create({
      title: req.body.title,
      content: req.body.content,
      image: imageUrl ? imageUrl : null,
      slug: slug,
    });

    res.status(201).json(newNews);
  } catch (error) {
    res.status(400).json({ message: error.message ?? String(error) });
  }
});

// Admin: Update a news article
router.put("/news/:id", authMiddleware, adminOnly, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      try {
        const { title, content } = req.body;
        const updatedNews = await News.findById(req.params.id);

        if (!updatedNews) {
          return res.status(404).json({ message: "Cannot find news article" });
        }

        updatedNews.title = title || updatedNews.title;
        updatedNews.content = content || updatedNews.content;
        updatedNews.slug = title ? title.toLowerCase().split(" ").join("-") : updatedNews.slug;

        if (req.file) {
          updatedNews.image = `/uploads/${req.file.filename}`;
        }

        const savedNews = await updatedNews.save();
        res.json(savedNews);
      } catch (error) {
        res.status(400).json({ message: error.message || String(error) });
      }
    }
  });
});

// Admin: Delete a news article
router.delete("/news/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (news == null) {
      return res.status(404).json({ message: "Cannot find news article" });
    }

    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted news article" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Admin: Get all news articles
router.get("/news", authMiddleware, adminOnly, async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
