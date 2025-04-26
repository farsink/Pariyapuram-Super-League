const Match = require("../Models/Match");
const Player = require("../Models/Player");
const Team = require("../Models/Team");
const client = require("../Config/redis");
const { updatePlayerStats, updateTeamStats } = require("./HelperControls");

// Create a new match
exports.createMatch = async (req, res) => {
  try {
    const { date, homeTeamName, awayTeamName, round } = req.body;

    // Find home team by name (case-insensitive)
    const homeTeam = await Team.findOne({ name: new RegExp(`^${homeTeamName}$`, "i") });
    if (!homeTeam) {
      throw new Error(`Home team not found: ${homeTeamName}`);
    }

    // Find away team by name (case-insensitive)
    const awayTeam = await Team.findOne({ name: new RegExp(`^${awayTeamName}$`, "i") });
    if (!awayTeam) {
      throw new Error(`Away team not found: ${awayTeamName}`);
    }

    // Create the match
    const match = await Match.create({
      date,
      homeTeam: homeTeam._id, // Use the home team's ObjectId
      awayTeam: awayTeam._id, // Use the away team's ObjectId
      round,
    });

    res.status(201).json(match);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all matches (populate team details)
exports.getAllMatches = async (req, res) => {
  const cacheKey = `matches:all`;
  const exp_time = 60 * 60; // 1 hour;


  try {
    // Check if matches are cached
    const cachedMatches = await client.get(cacheKey);
    if (cachedMatches) {
      // If cached, return the cached data
      console.log("Cache hit for matches");
      return res.status(200).json(JSON.parse(cachedMatches));
    }
    const matches = await Match.find()
      .populate({
        path: "homeTeam",
        select: "name logo players",
        populate: {
          path: "players",
          select: "name position",
        },
      }) // Populate home team name
      .populate({
        path: "awayTeam",
        select: "name logo players",
        populate: {
          path: "players",
          select: "name position",
        },
      })
      .populate({
        path: "goalScorers.player",
        select: "name",
      })
      .populate({
        path: "cards.player",
        select: "name",
      }); // Populate away team name
    await client.set(cacheKey, JSON.stringify(matches), "EX", exp_time); // Cache the matches for 1 hour
    console.log("Cache miss for matches, fetching from DB and caching");
    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a match by ID (populate team details)
exports.getMatchById = async (req, res) => {
  try {
    const match = await Match.findById(req.params.id)
      .populate("homeTeam", "name") // Populate home team name
      .populate("awayTeam", "name"); // Populate away team name
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json(match);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update a match by ID
exports.updateMatch = async (req, res) => {
  const { homeGoals, awayGoals, goalScorers, cards, wonTeam, status, round, date } = req.body;

  try {
    const match = await Match.findByIdAndUpdate(
      req.params.id,
      {
        date,
        homeGoals,
        awayGoals,
        goalScorers,
        cards,
        status,
        round, // Update status based on wonTeam,
        wonTeam,
      },
      { new: true }
    );

    // Update player and team stats
    await updatePlayerStats(goalScorers, cards);
    await updateTeamStats(match.homeTeam, match.awayTeam, homeGoals, awayGoals);

    res.status(200).json(match);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a match by ID
exports.deleteMatch = async (req, res) => {
  try {
    const match = await Match.findByIdAndDelete(req.params.id);
    if (!match) {
      return res.status(404).json({ message: "Match not found" });
    }
    res.status(200).json({ message: "Match deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
