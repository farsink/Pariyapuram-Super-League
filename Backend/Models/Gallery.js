const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  uploader: { type: string, ref: "User", required: true },

  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Gallery", GallerySchema);
