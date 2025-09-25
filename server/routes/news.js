const router = require("express").Router();
const { uploadSingle } = require("../middleware/uploadMiddleware");
const News = require("../models/News");
const multer = require("multer");
const cloudinary = require("cloudinary").v2; // Import Cloudinary

// Use memory storage for multer
const memoryStorage = multer.memoryStorage();

const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed!"), false);
    }
  },
}).single("image");

// Create a news article
router.post("/", uploadSingle, (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }
    let imageUrl = null;
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
          {
            folder: "flash_news_images",
          }
        );
        imageUrl = result.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }
    const slug = req.body.title.toLowerCase().split(" ").join("-");
    const newNews = new News({
      title: req.body.title,
      content: req.body.content,
      image: imageUrl,
      slug: slug,
    });
    try {
      const savedNews = await newNews.save();
      res.status(201).json(savedNews);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
});

// Get all news articles
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single news article by slug
router.get("/:slug", async (req, res) => {
  try {
    const news = await News.findOne({ slug: req.params.slug });
    if (news == null) {
      return res.status(404).json({ message: "Cannot find news article" });
    }
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a news article
router.put("/:id", upload, async (req, res) => {
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
      try {
        const result = await cloudinary.uploader.upload(
          `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
          {
            folder: "flash_news_images",
          }
        );
        updatedNews.image = result.secure_url;
      } catch (cloudinaryError) {
        console.error("Cloudinary upload error:", cloudinaryError);
        return res.status(500).json({ message: "Image upload failed" });
      }
    }

    const savedNews = await updatedNews.save();
    res.json(savedNews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

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

router.get("/test", (req, res) => {
  res.send("Test route works!");
});

module.exports = router;
