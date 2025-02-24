const News = require("../Models/News");
const fs = require("fs");
const path = require("path");

// Helper function to process news data
const processNewsData = async (req) => {
  const { title, description, category } = req.body;

  return {
    title,
    description,
    image: req.file ? req.file.filename : null, // Save the file path if an image is uploaded
    category,
  };
};

// Create News
exports.createNews = async (req, res) => {
  try {
    const newsData = await processNewsData(req);
    const news = await News.create(newsData);
    res.status(201).json({ message: "News created successfully", news });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get All News
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

// Update News
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const newsData = await processNewsData(req);

    const existingNews = await News.findById(id);
    if (!existingNews) {
      return res.status(404).json({ message: "News not found" });
    }

    // If no new image is uploaded, retain the existing image
    if (!req.file) {
      newsData.image = existingNews.image;
    } else {
      // If a new image is uploaded, delete the old image file
      if (existingNews.image) {
        const oldImagePath = path.join(__dirname, "../uploads/news", existingNews.image);
        fs.unlink(oldImagePath, (err) => {
          if (err) console.error("Failed to delete old image:", err);
        });
      }
    }

    const updatedNews = await News.findByIdAndUpdate(id, newsData, { new: true });
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete News
exports.deleteNews = async (req, res) => {
  try {
    const { id } = req.params;
    const news = await News.findByIdAndDelete(id);
    if (!news) {
      return res.status(408).json({ message: "News not found" });
    }

    // Delete the news image from the local folder
    if (news.image) {
      const imagePath = path.join(__dirname, "../uploads/news", news.image);
      fs.unlink(imagePath, (err) => {
        if (err) console.error("Failed to delete image:", err);
      });
    }

    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete news" });
  }
};
