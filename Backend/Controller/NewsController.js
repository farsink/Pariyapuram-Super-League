// Backend/Controller/NewsController.js
const News = require("../Models/News");
const fs = require("fs");
const cloudinary = require("../utils/Cloudinary");
const client = require("../Config/redis");


//create news 
exports.createNews = async (req, res) => {
  try {
    const { title, description, category } = req.body;
    let imageUrl = null;

    // If an image file is provided, upload to Cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "news_images",
      });
      imageUrl = result.secure_url;

      // Remove the temporary file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting temporary file:", err);
      });
    }

    const newsData = { title, description, category, image: imageUrl };
    const news = await News.create(newsData);
    res.status(201).json({ message: "News created successfully", news });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//
// Update News
exports.updateNews = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category } = req.body;
    const updateData = {};

    // Update basic fields if provided
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;

    // Fetch the existing news record
    const existingNews = await News.findById(id);
    if (!existingNews) {
      return res.status(404).json({ message: "News not found" });
    }

    // If a new image file is provided, upload it to Cloudinary
    if (req.file) {
      console.log("File received:", req.file);
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "news_images",
      });
      updateData.image = result.secure_url;
      console.log("Image uploaded to Cloudinary:", result.secure_url);

      // Remove the temporary file
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting temporary file:", err);
      });
    } else {
      // Retain the existing image if no new file is provided
      updateData.image = existingNews.image;
    }

    const updatedNews = await News.findByIdAndUpdate(id, updateData, { new: true });
    console.log("Updated news:", updatedNews);
    res.status(200).json(updatedNews);
  } catch (error) {
    console.error("Error updating news:", error);
    res.status(400).json({ error: error.message });
  }
};




// Get All News
exports.getNews = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default 10 items per page
  const skip = (page - 1) * limit;
  const cacheKey = `news:page:${page}:limit:${limit}`;
  try {
    // Check if data is cached in Redis
    const cachedNews = await client.get(cacheKey);
    if (cachedNews) {
      console.log("Cache hit for news");
      return res.status(200).json(JSON.parse(cachedNews));
    }
    const news = await News.find().skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // Latest first
    const total = await News.countDocuments();
    // Cache the news data for 1 hour
    await client.set(cacheKey, JSON.stringify({ news, meta: { page, limit, total, totalPages: Math.ceil(total / limit) } }), "EX", 60 * 60); // Cache for 1 hour
    res.status(200).json({
      news,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
};

// get all news without pagination
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }); // Latest first
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
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


    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete news" });
  }
};
