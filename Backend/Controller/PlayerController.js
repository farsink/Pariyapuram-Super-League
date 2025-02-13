const Player = require("../Models/Player");
const Team = require("../Models/Team");
const fs = require("fs");
const path = require("path");
//proccess the player data
const processPlayerData = async (req, file, playerId = null) => {
  const { name, position, team, stats } = req.body;
  console.log(req.body, playerId);

  // Parse stats if it's a string
  const parsedStats = typeof stats === "string" ? JSON.parse(stats) : stats;

  // Find the team
  const teamDoc = await Team.findOne({ name: new RegExp(`^${team}$`, "i") });
  if (!teamDoc) {
    throw new Error(`Team not found: ${team}`);
  }

  // If updating, handle team changes
  if (playerId) {
    const player = await Player.findById(playerId);
    if (!player) {
      throw new Error("Player not found");
    }

    if (player.team.toString() !== teamDoc._id.toString()) {
      const oldTeam = await Team.findById(player.team);
      if (oldTeam) {
        oldTeam.players.pull(player._id);
        await oldTeam.save();
      }

      teamDoc.players.push(player._id);
      await teamDoc.save();
    } else if (player.team.toString() == teamDoc._id.toString()) {
      const teamOld = await Team.findById(player.team);

      const isPlayerInTeam = teamOld.players.includes(playerId);

      if (!isPlayerInTeam) {
        teamDoc.players.push(playerId);
        await teamDoc.save();
      }
    }
  }

  return {
    image: file ? file.filename : null,
    name,
    position,
    team: teamDoc._id,
    stats: parsedStats,
  };
};

// Create a new player
exports.createPlayer = async (req, res) => {
  try {
    const { name } = req.body;

    // Check if the player already exists
    const existingPlayer = await Player.findOne({ name: new RegExp(`^${name}$`, "i") });
    if (existingPlayer) {
      return res.status(400).json({ message: "Player already exists" });
    }

    const playerData = await processPlayerData(req.body, req.file);

    // Create the player
    const player = await Player.create(playerData);

    // Add the player to the team's players array
    const teamDoc = await Team.findById(playerData.team);
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
    const players = await Player.find().populate("team", "name logo"); // Populate team name if needed
    const SortedPlayers = players.sort((a, b) => {
      return (b.stats.goals || 0) - (a.stats.goals || 0);
    }); // Sort
    res.status(200).json(SortedPlayers);
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
    const playerData = await processPlayerData(req, req.file, req.params.id);
    console.log(playerData);

    // Update the player
    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, playerData, {
      new: true,
      runValidators: true,
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
