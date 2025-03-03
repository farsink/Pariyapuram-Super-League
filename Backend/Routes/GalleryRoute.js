const express = require("express");
const galleryController = require("../Controller/GalleryController");
const { galleryUpload } = require("../utils/Multer");

const router = express.Router();

// Route to handle image upload (POST)
router.post("/upload", galleryUpload.single("image"), galleryController.uploadImage);

// Route to fetch all images (GET)
router.get("/getall", galleryController.getAllImages);

// 
router.delete("/delete/:id", galleryController.deleteImage);

module.exports = router;
