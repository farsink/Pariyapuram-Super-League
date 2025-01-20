const mongoose = require("mongoose");

const tournamentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  season: { type: String, required: true }, // e.g., "2023/2024"
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  winner: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
});

module.exports = mongoose.model("Tournament", tournamentSchema);
