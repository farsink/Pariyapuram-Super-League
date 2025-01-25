const express = require("express");
const playerController = require("../Controller/PlayerController.js");

const router = express.Router();

router.post("/create", playerController.createPlayer);
router.get("/getAll", playerController.getAllPlayers);
router.get("/:id", playerController.getPlayerById);
router.put("/:id", playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);

module.exports = router;
