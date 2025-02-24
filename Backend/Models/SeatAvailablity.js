const mongoose = require("mongoose");

const seatAvailabilitySchema = new mongoose.Schema({
  matchId: { type: mongoose.Schema.Types.ObjectId, ref: "Match", required: true },
  seats: {
    low: {
      total: { type: Number, required: true, default: 100 },
      booked: { type: Number, required: true, default: 0 },
    },
    premium: {
      total: { type: Number, required: true, default: 50 },
      booked: { type: Number, required: true, default: 0 },
    },
    VIP: {
      total: { type: Number, required: true, default: 50 },
      booked: { type: Number, required: true, default: 0 },
    },
  },
});

module.exports = mongoose.model("SeatAvailability", seatAvailabilitySchema);
