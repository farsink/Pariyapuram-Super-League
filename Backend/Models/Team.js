const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Team name
  logo: { type: String }, // URL to the team's logo
  manager: [{ type: String }], // Array of manager names
  currentPosition: { type: Number, default: 0 }, // Current position in the league
  currentPoints: { type: Number, default: 0 }, // Total points accumulated
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: "Player" }], // Reference to Player model
  stats: {
    matchesPlayed: { type: Number, default: 0 }, // Matches played
    wins: { type: Number, default: 0 }, // Matches won
    drawn: { type: Number, default: 0 }, // Matches drawn
    lost: { type: Number, default: 0 }, // Matches lost
    goalsScored: { type: Number, default: 0 }, // Goals scored by the team
    goalsConceded: { type: Number, default: 0 }, // Goals conceded by the team
    goalDifference: { type: Number, default: 0 }, // Goal difference (goalsScored - goalsConceded)
  },
  form: [{ type: String, enum: ["W", "D", "L"], default: [] }], // Recent form (e.g., ["W", "D", "W"])
});

module.exports = mongoose.model("Team", teamSchema);
