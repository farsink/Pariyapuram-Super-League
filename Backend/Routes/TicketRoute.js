const express = require("express");
const { getallticket, updateTicketPaymentStatus, createTicket, getTicketById, UpdateTicket } = require("../Controller/TicketController");

const router = express.Router();

// Get all tickets

router.get("/getAll", getallticket);

// Update ticket payment status

router.put("/updatePaymentStatus/:id", updateTicketPaymentStatus);
router.put("/update",UpdateTicket);
// Create a new ticket

router.post("/create", createTicket);
router.get("/:id",getTicketById)

module.exports = router;

// Get all tickets