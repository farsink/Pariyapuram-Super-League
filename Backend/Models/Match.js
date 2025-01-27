const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema({
  date: { type: Date, required: true }, // Match date
  homeTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }, // Reference to Team model
  awayTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", required: true }, // Reference to Team model
  status: {
    type: String,
    enum: ["scheduled", "ongoing", "completed"],
    default: "scheduled",
  }, // Match status
  homeGoals: { type: Number, default: 0 }, // Goals scored by home team
  awayGoals: { type: Number, default: 0 }, // Goals scored by away team
  goalScorers: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" }, // Player who scored
      team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }, // Team of the player
    },
  ], // List of goal scorers
  cards: [
    {
      player: { type: mongoose.Schema.Types.ObjectId, ref: "Player" }, // Player who received the card
      team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" }, // Team of the player
      cardType: { type: String, enum: ["yellow", "red"] }, // Type of card (yellow/red)
    },
  ], // List of cards issued
  round: { type: String, required: true }, // Round of the match (e.g., "Group Stage", "Final")
  wonTeam: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null }, // Winning team (if completed)
});

module.exports = mongoose.model("Match", matchSchema);
