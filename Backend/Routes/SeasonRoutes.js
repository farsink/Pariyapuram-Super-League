const express = require("express");
const seasonController = require("../Controller/SeasonController.js");

const router = express.Router();

// Create a new season
router.post("/create", seasonController.createSeason);

// Get all seasons
router.get("/gellAll", seasonController.getAllSeasons);

// Get a season by ID
router.get("/:id", seasonController.getSeasonById);

// Update a season by ID
router.put("/:id", seasonController.updateSeason);

// Delete a season by ID
router.delete("/:id", seasonController.deleteSeason);

module.exports = router;
