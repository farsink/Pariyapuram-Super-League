const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  matchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match",
    required: true,
  },

  // The chosen seat tier: low, premium, or VIP
  seatTier: {
    type: String,
    enum: ["low", "premium", "VIP"],
    required: true,
  },
  // Number of tickets booked in this transaction
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  // Price details for record keeping
  pricePerTicket: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  // Payment status before integrating payment gateway
  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  // This field will store the transaction ID returned from the payment gateway
  paymentId: {
    type: String,
  },
  bookingDate: {
    type: Date,
    default: Date.now,
  },
  // Final ticket status, can be used to track cancellations, etc.
  status: {
    type: String,
    enum: ["Confirmed", "Cancelled"],
    default: "Confirmed",
  },
});

module.exports = mongoose.model("Ticket", TicketSchema);
