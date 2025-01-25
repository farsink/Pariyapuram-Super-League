const Team = require("../Models/Team");
const Player = require("../Models/Player");
const { json, request } = require("express");

// Create a new team with logo upload
exports.createTeam = async (req, res) => {
  try {
    const { name, manager, currentPosition, currentPoints, players, stats } = req.body;

    // Split and trim player names
    const playerNamesArray = players.split(",").map((name) => name.trim().replace(/['"]+/g, "")); // Remove extra quotes

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

    // Create the team with the logo path and player IDs
    const team = await Team.create({
      name: JSON.parse(name),
      logo: req.file ? req.file.filename : null, // Save the file path if a logo is uploaded
      manager: Managersarray,
      currentPosition,
      currentPoints,
      players: playerIds,
      stats : parsedStats,
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
    const { name, manager, currentPosition, currentPoints, players, stats } = req.body;

    // Split and trim player names
    const playerNamesArray = players.split(",").map((name) => name.trim().replace(/['"]+/g, "")); // Remove extra quotes

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

    const team = await Team.findByIdAndUpdate(
      req.params.id,
      {
        name: JSON.parse(name),
        logo: req.file ? req.file.filename : undefined, // Update the logo path if a new file is uploaded
        manager: Managersarray,
        currentPosition,
        currentPoints,
        players: playerIds,
        stats: parsedStats,
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
