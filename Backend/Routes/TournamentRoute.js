const express = require("express");
const tournamentController = require("../Controller/TournamentController.js");

const router = express.Router();

// Create a new tournament
router.post("/create", tournamentController.createTournament);

// Get all tournaments
router.get("/getAll", tournamentController.getAllTournaments);

// Get a tournament by ID
router.get("/:id", tournamentController.getTournamentById);

// Update a tournament by ID
router.put("/:id", tournamentController.updateTournament);

// Delete a tournament by ID
router.delete("/:id", tournamentController.deleteTournament);

module.exports = router;
