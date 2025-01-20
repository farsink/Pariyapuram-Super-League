const Season = require("../Models/Season");
const Tournament = require("../Models/Tournament");
const Team = require("../Models/Team");
const Match = require("../Models/Match");

// Create a new season
exports.createSeason = async (req, res) => {
  try {
    const { tournamentName, year, startDate, endDate, teamNames, matchIds } = req.body;

    // Find tournament by name (case-insensitive)
    const tournament = await Tournament.findOne({ name: new RegExp(`^${tournamentName}$`, "i") });
    if (!tournament) {
      throw new Error(`Tournament not found: ${tournamentName}`);
    }

    // Find teams by names (case-insensitive)
    const teams = await Promise.all(
      teamNames.map(async (teamName) => {
        const team = await Team.findOne({ name: new RegExp(`^${teamName}$`, "i") });
        if (!team) {
          throw new Error(`Team not found: ${teamName}`);
        }
        return team._id; // Return the team's ObjectId
      })
    );

    // Create the season
    const season = await Season.create({
      tournamentId: tournament._id, // Use the tournament's ObjectId
      year,
      startDate,
      endDate,
      teams, // Array of team ObjectIds
      matches: matchIds, // Array of match ObjectIds
    });

    res.status(201).json(season);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all seasons (populate tournament, teams, and matches)
exports.getAllSeasons = async (req, res) => {
  try {
    const seasons = await Season.find()
      .populate("tournamentId", "name") // Populate tournament name
      .populate("teams", "name") // Populate team names
      .populate("matches"); // Populate match details
    res.status(200).json(seasons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a season by ID (populate tournament, teams, and matches)
exports.getSeasonById = async (req, res) => {
  try {
    const season = await Season.findById(req.params.id)
      .populate("tournamentId", "name") // Populate tournament name
      .populate("teams", "name") // Populate team names
      .populate("matches"); // Populate match details
    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }
    res.status(200).json(season);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a season by ID
exports.updateSeason = async (req, res) => {
  try {
    const { tournamentName, year, startDate, endDate, teamNames, matchIds } = req.body;

    let tournamentId, teams;

    // Find tournament by name (if provided)
    if (tournamentName) {
      const tournament = await Tournament.findOne({ name: new RegExp(`^${tournamentName}$`, "i") });
      if (!tournament) {
        throw new Error(`Tournament not found: ${tournamentName}`);
      }
      tournamentId = tournament._id;
    }

    // Find teams by names (if provided)
    if (teamNames) {
      teams = await Promise.all(
        teamNames.map(async (teamName) => {
          const team = await Team.findOne({ name: new RegExp(`^${teamName}$`, "i") });
          if (!team) {
            throw new Error(`Team not found: ${teamName}`);
          }
          return team._id; // Return the team's ObjectId
        })
      );
    }

    const season = await Season.findByIdAndUpdate(
      req.params.id,
      {
        tournamentId, // Update tournament reference (if provided)
        year,
        startDate,
        endDate,
        teams, // Update team references (if provided)
        matches: matchIds, // Update match references (if provided)
      },
      { new: true, runValidators: true } // Return the updated season and run validators
    );

    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }
    res.status(200).json(season);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a season by ID
exports.deleteSeason = async (req, res) => {
  try {
    const season = await Season.findByIdAndDelete(req.params.id);
    if (!season) {
      return res.status(404).json({ message: "Season not found" });
    }
    res.status(200).json({ message: "Season deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
