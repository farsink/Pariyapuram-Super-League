const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  url: { type: String, required: true }, // Cloudinary URL
  uploader: { type:String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Gallery", GallerySchema);
