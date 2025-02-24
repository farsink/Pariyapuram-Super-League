const express = require("express");
const { createNews, getAllNews, updateNews, deleteNews } = require("../Controller/NewsController");
const { newsUpload } = require("../utils/Multer"); // Import the news-specific upload

const router = express.Router();

// Create News (with image upload middleware)
router.post("/create", newsUpload.single("image"), createNews);

// Get All News
router.get("/all", getAllNews);

// Update News (with image upload middleware)
router.put("/update/:id", newsUpload.single("image"), updateNews);

// Delete News
router.delete("/:id", deleteNews);

module.exports = router;
