const Gallery = require("../Models/Gallery");
const cloudinary = require("../utils/Cloudinary");
const fs = require("fs");

// Upload Image: Uploads to Cloudinary and saves metadata in MongoDB
exports.uploadImage = async (req, res) => {
    let file;
    try {
        file = req.file;
        if (!file) return res.status(400).json({ message: "No file uploaded" });
        const { user } = req.body;
        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "PSL_gallery",
        });

        const newImage = new Gallery({
            url: result.secure_url,
            uploader: user,
        });
        // Delete temp file after upload
        fs.unlink(file.path, (err) => {
            if (err) {
                console.error("Error deleting temp file:", err);
            } else {
                console.log("Temp file deleted successfully");
            }
        });

        await newImage.save();
        res.status(201).json(newImage);
    } catch (error) {
        // Delete temp file on error if one exists
        if (file && file.path) {
            fs.unlink(file.path, (err) => {
                if (err) console.error("Error deleting temp file on error:", err);
            });
        }
        console.error("Error uploading image:", error);
        res.status(500).json({ message: "Failed to upload image" });
    }
};

// Get All Images: Retrieve images sorted by latest
exports.getAllImages = async (req, res) => {
    try {
        const images = await Gallery.find().sort({ createdAt: -1 });
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch images" });
    }
};

// delete image by id 
exports.deleteImage = async (req, res) => {
    try {
        const image = await Gallery.findByIdAndDelete(req.params.id);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete image" });
    }
};