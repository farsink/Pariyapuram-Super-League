const express = require("express");
const matchController = require("../Controller/MatchController.js");

const router = express.Router();

// Create a new match
router.post("/create", matchController.createMatch);

// Get all matches
router.get("/getAll", matchController.getAllMatches);

// Get a match by ID
router.get("/:id", matchController.getMatchById);

// Update a match by ID
router.put("/:id", matchController.updateMatch);

// Delete a match by ID
router.delete("/:id", matchController.deleteMatch);

module.exports = router;
