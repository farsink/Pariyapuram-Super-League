const Tournament = require("../Models/Tournament");

// Create a new tournament
exports.createTournament = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;

    // Create the tournament
    const tournament = await Tournament.create({
      name,
      startDate,
      endDate,
    });

    res.status(201).json(tournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all tournaments
exports.getAllTournaments = async (req, res) => {
  try {
    const tournaments = await Tournament.find();
    res.status(200).json(tournaments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a tournament by ID
exports.getTournamentById = async (req, res) => {
  try {
    const tournament = await Tournament.findById(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    res.status(200).json(tournament);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a tournament by ID
exports.updateTournament = async (req, res) => {
  try {
    const { name, startDate, endDate } = req.body;

    const tournament = await Tournament.findByIdAndUpdate(
      req.params.id,
      {
        name,
        startDate,
        endDate,
      },
      { new: true, runValidators: true } // Return the updated tournament and run validators
    );

    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    res.status(200).json(tournament);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a tournament by ID
exports.deleteTournament = async (req, res) => {
  try {
    const tournament = await Tournament.findByIdAndDelete(req.params.id);
    if (!tournament) {
      return res.status(404).json({ message: "Tournament not found" });
    }
    res.status(200).json({ message: "Tournament deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
