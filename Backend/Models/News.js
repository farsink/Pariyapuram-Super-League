const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }, // Store file path or URL
  category: { type: String, required: true }, // e.g., "Match Updates", "Player News"
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("News", newsSchema);
