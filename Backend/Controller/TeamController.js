const Team = require("../Models/Team");
const Player = require("../Models/Player");
const fs = require("fs");
const path = require("path");
// common funtion To process team data
const processTeamData = async (req) => {
  const { name, manager, currentPosition, currentPoints, players, stats } = req.body;

  const playerNamesArray = players
    ? players.split(",").map((name) => name.trim().replace(/['"]+/g, "").trim())
    : []; // Remove extra quotes

  // Split and trim manager names
  const Managersarray = manager.split(",").map((name) => name.trim().replace(/['"]+/g, "")); // Remove extra quotes

  // Find player IDs by names (case-insensitive)
  const playerIds = await Promise.all(
    playerNamesArray.map(async (playerName) => {
      const player = await Player.findOne({ name: new RegExp(`^${playerName}$`, "i") });
      if (!player) {
        throw new Error(`Player not found: ${playerName}`);
      }
      return player._id; // Return the player's ObjectId
    })
  );

  const parsedStats = typeof stats === "string" ? JSON.parse(stats) : stats;

  return {
    name: JSON.parse(name),
    logo: req.file ? req.file.filename :null, // Save the file path if a logo is uploaded
    manager: Managersarray,
    currentPosition,
    currentPoints,
    players: playerIds,
    stats: parsedStats,
  };
};

// Create a new team with logo upload
exports.createTeam = async (req, res) => {
  try {
    const teamData = await processTeamData(req);
    const team = await Team.create(teamData);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    const teamData = await processTeamData(req); // Logo is set here based on req.file

    const existingTeam = await Team.findById(req.params.id);
    if (!existingTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    // If no new logo is uploaded, retain the existing logo
    if (!req.file) {
      teamData.logo = existingTeam.logo;
    } else {
      // If a new logo is uploaded, delete the old logo file
      if (existingTeam.logo) {
        const oldLogoPath = path.join(__dirname, "../uploads", existingTeam.logo);
        fs.unlink(oldLogoPath, (err) => {
          if (err) console.error("Failed to delete old logo:", err);
        });
      }
    }

    const team = await Team.findByIdAndUpdate(req.params.id, teamData, { new: true });
    res.status(200).json(team);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a team by ID
exports.deleteTeam = async (req, res) => {
  try {
    const team = await Team.findByIdAndDelete(req.params.id);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Delete the team's photo from the local folder
    if (team.image) {
      const imagePath = path.join(__dirname, "../uploads", team.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err);
        }
      });
    }

    res.status(200).json({ message: "Team deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
