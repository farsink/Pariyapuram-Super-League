const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: { type: String },
  manager: [{ type: String }],
  currentPosition: { type: Number },
  currentPoints: { type: Number, default: 0 },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }],
  stats: {
    matchesPlayed: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    goalsScored: { type: Number, default: 0 },
    goalsConceded: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Team", teamSchema);
