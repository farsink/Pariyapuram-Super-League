const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  stats: {
    goals: { type: Number, default: 0 },
    assists: { type: Number, default: 0 },
    matchesPlayed: { type: Number, default: 0 },
    yellowCards: { type: Number, default: 0 },
    redCards: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model("Player", playerSchema);
