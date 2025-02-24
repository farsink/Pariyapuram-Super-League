const express = require("express");
const router = express.Router();
const SeatAvailabilityController = require("../Controller/SeatAvailabilityController");

router.get("/:matchId", SeatAvailabilityController.getSeatAvailability);
router.post("/:matchId", SeatAvailabilityController.createOrUpdateSeatAvailability);
module.exports = router;
