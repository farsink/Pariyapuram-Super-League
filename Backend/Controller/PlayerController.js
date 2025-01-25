const Player = require("../Models/Player");
const Team = require("../Models/Team");

// Create a new player
exports.createPlayer = async (req, res) => {
  try {
    const { name, position, team, stats } = req.body;

    const teamID = await Team.findOne({ name: new RegExp(`^${team}$`, "i") });
    if (!team) {
      throw new Error(`Team not found: ${team}`);
    }

    const parsedStats = typeof stats === "string" ? JSON.parse(stats) : stats;
   

    // Create the player
    const player = await Player.create({
      image: req.file ? req.file.filename : null,
      name ,
      position,
      team: teamID? teamID._id : null,
      stats:parsedStats,
    });

    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all players
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate("team"); // Populate team details if needed
    res.status(200).json(players);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a player by ID
exports.getPlayerById = async (req, res) => {
  try {
    const player = await Player.findById(req.params.id).populate("team"); // Populate team details if needed
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json(player);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a player by ID
exports.updatePlayer = async (req, res) => {
  try {
    const { name, position, team, stats } = req.body;

    let teamID = null;
    if (team) {
      const teamDoc = await Team.findOne({ name: new RegExp(`^${team}$`, "i") });
      if (!teamDoc) {
        throw new Error(`Team not found: ${team}`);
      }
      teamID = teamDoc._id;
    }

    const parsedStats = typeof stats === "string" ? JSON.parse(stats) : stats;

    const updateData = {
      name,
      position,
      team: teamID,
      stats: parsedStats,
    };

    const player = await Player.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the updated player
      runValidators: true, // Validate the update data
    });

    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Delete a player by ID
exports.deletePlayer = async (req, res) => {
  try {
    const player = await Player.findByIdAndDelete(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
