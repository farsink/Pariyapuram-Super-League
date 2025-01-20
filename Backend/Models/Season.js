const mongoose = require("mongoose");

const seasonSchema = new mongoose.Schema({
  tournamentId: { type: mongoose.Schema.Types.ObjectId, ref: "Tournament", required: true },
  year: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  teams: [{ type: mongoose.Schema.Types.ObjectId, ref: "Team" }],
  matches: [{ type: mongoose.Schema.Types.ObjectId, ref: "Match" }],
});

module.exports = mongoose.model("Season", seasonSchema);
