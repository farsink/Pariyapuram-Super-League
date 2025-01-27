const Player = require("../Models/Player");
const Team = require("../Models/Team");
const fs = require("fs");
const path = require("path");

// Create a new player
exports.createPlayer = async (req, res) => {
  try {
    const { name, position, team, stats } = req.body;
    // Check if the player already exists
    const existingPlayer = await Player.findOne({ name: new RegExp(`^${name}$`, "i") });
    if (existingPlayer) {
      return res.status(400).json({ message: "Player already exists" }); // Return the existing player
    }

    const teamDoc = await Team.findOne({ name: new RegExp(`^${team}$`, "i") });
    if (!teamDoc) {
      throw new Error(`Team not found: ${team}`);
    }

    const parsedStats = typeof stats === "string" ? JSON.parse(stats) : stats;

    // Create the player
    const player = await Player.create({
      image: req.file ? req.file.filename : null,
      name,
      position,
      team: teamDoc ? teamDoc._id : null,
      stats: parsedStats,
    });

    // Add the player to the team's players array
    teamDoc.players.push(player._id);
    await teamDoc.save();

    res.status(201).json(player);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all players
exports.getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find().populate("team", "name"); // Populate team name if needed
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

    const parsedStats = typeof stats === "string" ? JSON.parse(stats) : stats;

    const player = await Player.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ message: "Player not found" });
    }

    let teamId = player.team; // Default to the current team ID
    if (team) {
      const teamDoc = await Team.findOne({ name: new RegExp(`^${team}$`, "i") });
      if (!teamDoc) {
        return res.status(404).json({ message: "Team not found" });
      }
      teamId = teamDoc._id;
    }

    const updateData = {
      name,
      position,
      team: teamId,
      stats: parsedStats,
    };

    // If the team is changing, remove the player from the old team's players array
    if (player.team.toString() !== teamId.toString()) {
      const oldTeam = await Team.findById(player.team);
      if (oldTeam) {
        oldTeam.players.pull(player._id);
        await oldTeam.save();
      }

      const newTeam = await Team.findById(teamId);
      if (newTeam) {
        newTeam.players.push(player._id);
        await newTeam.save();
      }
    }

    // Update the player
    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, updateData, {
      new: true, // Return the updated player
      runValidators: true, // Validate the update data
    });

    res.status(200).json(updatedPlayer);
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

    // Delete the player's photo from the local folder
    if (player.image) {
      const imagePath = path.join(__dirname, "../uploads", player.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        }
      });
    }

    res.status(200).json({ message: "Player deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
