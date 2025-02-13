const express = require("express");
const teamController = require("../Controller/TeamController.js");
const { upload } = require("../utils/Multer.js");

const router = express.Router();

// Create a new team with logo upload
router.post("/create", upload.single("logo"), teamController.createTeam);

// Get all teams
router.get("/getAll", teamController.getAllTeams);

// Get a team by ID
router.get("/:id", teamController.getTeamById);

// Update a team by ID (with optional logo upload)
router.put("/:id", upload.single("logo"), teamController.updateTeam);

// Delete a team by ID
router.delete("/:id", teamController.deleteTeam);

module.exports = router;
