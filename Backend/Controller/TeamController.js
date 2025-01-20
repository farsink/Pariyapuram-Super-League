const Team = require("../Models/Team");
const Player = require("../Models/Player");

// Create a new team with logo upload
exports.createTeam = async (req, res) => {
  try {
    const { name, manager, currentPosition, currentPoints, players } = req.body;

    // Parse the players field from a JSON string to an array
    let playersArray;
    try {
      playersArray = JSON.parse(players); // Parse the JSON string
    } catch (err) {
      throw new Error("Players must be a valid JSON array of player names.");
    }

    // Validate that playersArray is an array
    if (!Array.isArray(playersArray)) {
      throw new Error("Players must be an array of player names.");
    }

    // Find player IDs by names (case-insensitive)
    const playerIds = await Promise.all(
      playersArray.map(async (playerName) => {
        const player = await Player.findOne({ name: new RegExp(`^${playerName}$`, "i") });
        if (!player) {
          throw new Error(`Player not found: ${playerName}`);
        }
        return player._id; // Return the player's ObjectId
      })
    );

    // Create the team with the logo path and player IDs
    const team = await Team.create({
      name,
      logo: req.file ? req.file.path : null, // Save the file path if a logo is uploaded
      manager,
      currentPosition,
      currentPoints,
      players: playerIds, // Array of player ObjectIds
    });

    res.status(201).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all teams
exports.getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate({
      path: "players",
      select: "name",
    });
    res.status(200).json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a team by ID
exports.getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("players manager");
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a team by ID (with optional logo upload)
exports.updateTeam = async (req, res) => {
  try {
    const { name, manager, currentPosition, currentPoints, players } = req.body;

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        name,
        logo: req.file ? req.file.path : undefined, // Update the logo path if a new file is uploaded
        manager,
        currentPosition,
        currentPoints,
        players,
      },
      { new: true, runValidators: true } // Return the updated team and run validators
    );

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json(team);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a team by ID
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
