const SeatAvailability = require("../Models/SeatAvailablity");

// Get Seat Availability for a Match
exports.getSeatAvailability = async (req, res) => {
  const { matchId } = req.params;
  try {
    const availability = await SeatAvailability.findOne({ matchId });
    if (!availability) {
      return res.status(404).json({ error: "Availability info not found" });
    }

    const remainingSeats = {
      low: availability.seats.low.total - availability.seats.low.booked,
      premium: availability.seats.premium.total - availability.seats.premium.booked,
      VIP: availability.seats.VIP.total - availability.seats.VIP.booked,
    };

    res.status(200).json({ remainingSeats });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create or Update Seat Availability for a Match
exports.createOrUpdateSeatAvailability = async (req, res) => {
  const { matchId } = req.params; // Extract matchId as a string
  const { seats } = req.body;
  try {
    const availability = await SeatAvailability.findOneAndUpdate(
      { matchId },
      { matchId, seats },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: "Seat availability updated successfully", availability });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};