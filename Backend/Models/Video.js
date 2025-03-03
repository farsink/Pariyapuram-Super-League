const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  videoId: { type: String, required: true, unique: true },
  thumbnail: { type: String },
  publishedAt: { type: Date },
  duration: { type: String }, // ISO 8601 duration string (e.g., "PT5M33S")
  views: { type: Number },    // Number of views
  channelId: { type: String },
  channelTitle: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Video", videoSchema);