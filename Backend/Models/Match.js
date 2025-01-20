const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true },
  score: {
    home: { type: Number, default: 0 },
    away: { type: Number, default: 0 },
  },
  status: { type: String, enum: ["scheduled", "ongoing", "completed"], default: "scheduled" },
  wonTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
  round: { type: String, required: true }, // e.g., "Group Stage", "Quarterfinal", "Final"
});

module.exports = mongoose.model("Match", matchSchema);
