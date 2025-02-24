const SeatAvailablity = require("../Models/SeatAvailablity");
const Ticket = require("../Models/Tickets");

exports.createTicket = async (req, res) => {
  try {
    const {
      userId,
      matchId,
      seatTier, // optional if you want to store specific seat numbers
      quantity,
      pricePerTicket,
    } = req.body;
    // Ensure numeric values are valid

    const totalPrice = pricePerTicket * quantity;

    // Create a new ticket with paymentStatus "Pending"
    const newTicket = new Ticket({
      userId,
      matchId,
      seatTier,
      quantity,
      pricePerTicket,
      totalPrice,
      paymentStatus: "Pending",
    });

    await newTicket.save();
    await SeatAvailablity.findOneAndUpdate(
      { matchId },
      { $inc: { [`seats.${seatTier}.booked`]: quantity } }
    );

    res.status(200).json({
      message: "Ticket created successfully",
      ticket: newTicket,
      seats: await SeatAvailablity.findOne({ matchId }),
    });
  } catch (error) {
    console.error("Error creating ticket:", error);
    res.status(500).json({ error: error.message });
  }
};
exports.updateTicketPaymentStatus = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { paymentStatus, paymentId } = req.body; // e.g., paymentStatus: "Paid" or "Failed"

    const updatedTicket = await Ticket.findByIdAndUpdate(
      ticketId,
      { paymentStatus, paymentId },
      { new: true }
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.json({
      message: "Ticket payment status updated successfully",
      ticket: updatedTicket,
    });
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.getallticket = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    console.error("Error getting ticket:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.UpdateTicket = async (req,res) =>{
    try {
      const { ticketId, paymentStatus, paymentId } = req.body;
      // Update the ticket; this uses the _id from MongoDB
      const updatedTicket = await Ticket.findByIdAndUpdate(
        ticketId,
        { paymentStatus, paymentId },
        { new: true }
      );
      if (!updatedTicket) {
        return res.status(404).json({ error: "Ticket not found" });
      }
      res.json({ ticket : updatedTicket });
    } catch (error) {
      console.error("Error updating ticket:", error);
      res.status(500).json({ error: error.message });
    }
}