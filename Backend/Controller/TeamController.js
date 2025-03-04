const Team = require("../Models/Team");
const Player = require("../Models/Player");
const fs = require("fs");
const path = require("path");
const cloudinary = require("../utils/Cloudinary");
// common funtion To process team data
const processTeamData = async (req) => {
  const { name, manager, currentPosition, currentPoints, players, stats } = req.body;
  console.log(req.body);

  // Process players: split and trim names, remove extra quotes
  const playerNamesArray = players
    ? players.split(",").map((name) => name.trim().replace(/['"]+/g, ""))
    : [];

  // Process managers: split and trim names
  const managersArray = manager.split(",").map((name) => name.trim().replace(/['"]+/g, ""));

  // Find player IDs by names (case-insensitive)
  const playerIds = await Promise.all(
    playerNamesArray.map(async (playerName) => {
      const player = await Player.findOne({ name: new RegExp(`^${playerName}$`, "i") });
      if (!player) {
        throw new Error(`Player not found: ${playerName}`);
      }
      return player._id;
    })
  );

  const parsedStats = typeof stats === "string" ? JSON.parse(stats) : stats;
  const goalDiff = (parsedStats.goalsScored - parsedStats.goalsConceded).toString() || "0";

  // If a logo file is provided, upload to Cloudinary and remove the temporary file
  let logoUrl = null;
  if (req.file) {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "team_logos",
    });
    logoUrl = result.secure_url;
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting temporary file:", err);
    });
  }

  return {
    name: JSON.parse(name),
    logo: logoUrl, // Cloudinary URL for the logo
    manager: managersArray,
    currentPosition,
    currentPoints,
    players: playerIds,
    stats: { ...parsedStats, goalDifference: goalDiff },
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
    const sortedTeams = teams.sort((a, b) => {
      return (a.currentPosition || 0) - (b.currentPosition || 0);
    });
    res.status(200).json(sortedTeams);
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
    const { name, manager, currentPosition, currentPoints, players, stats } = req.body;
    console.log(req.body);
    const updateData = {};

    // Process name if provided
    if (name) {
      updateData.name = JSON.parse(name);
    }

    // Process manager names if provided
    if (manager) {
      const managersArray = manager.split(",").map((m) => m.trim().replace(/['"]+/g, ""));
      updateData.manager = managersArray;
    }

    // Process other basic fields if provided
    if (currentPosition) updateData.currentPosition = currentPosition;
    if (currentPoints) updateData.currentPoints = currentPoints;

    // Process players: find player IDs by names if provided
    if (players) {
      const playerNamesArray = players.split(",").map((n) => n.trim().replace(/['"]+/g, ""));
      const playerIds = await Promise.all(
        playerNamesArray.map(async (playerName) => {
          const player = await Player.findOne({ name: new RegExp(`^${playerName}$`, "i") });
          if (!player) {
            throw new Error(`Player not found: ${playerName}`);
          }
          return player._id;
        })
      );
      updateData.players = playerIds;
    }

    // Process stats if provided
    if (stats) {
      const parsedStats = typeof stats === "string" ? JSON.parse(stats) : stats;
      const goalDiff = (parsedStats.goalsScored - parsedStats.goalsConceded).toString() || "0";
      updateData.stats = { ...parsedStats, goalDifference: goalDiff };
    }

    // Handle logo upload if a new file is provided.
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "team_logos",
      });
      updateData.logo = result.secure_url;

      // Remove the temporary file from /tmp
      fs.unlink(req.file.path, (err) => {
        if (err) console.error("Error deleting temporary file:", err);
      });
    }

    // Update the team. If no new logo is provided, the logo field remains unchanged.
    const updatedTeam = await Team.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedTeam) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.status(200).json(updatedTeam);
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
