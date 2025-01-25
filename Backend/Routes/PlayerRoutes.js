const express = require("express");
const playerController = require("../Controller/PlayerController.js");
upload = require("../utils/Multer.js");

const router = express.Router();

router.post("/create", upload.single("image"), playerController.createPlayer);
router.get("/getAll", playerController.getAllPlayers);
router.get("/:id", playerController.getPlayerById);
router.put("/:id", upload.single("image"),  playerController.updatePlayer);
router.delete("/:id", playerController.deletePlayer);

module.exports = router;
