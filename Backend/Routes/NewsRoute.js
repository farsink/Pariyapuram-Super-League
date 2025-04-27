const express = require("express");
const { createNews, getAllNews, updateNews, deleteNews, getNews } = require("../Controller/NewsController");
const { newsUpload } = require("../utils/Multer"); // Import the news-specific upload

const router = express.Router();

// Create News (with image upload middleware)
router.post("/create", newsUpload.single("image"), createNews);

// Get All News with pagination and sorting
router.get("/getNews", getNews
);
// get all news without pagination
router.get("/getall", getAllNews);
// Update News (with image upload middleware)
router.put("/:id", newsUpload.single("image"), updateNews);

// Delete News
router.delete("/:id", deleteNews);

module.exports = router;
