// routes/paymentRoutes.js
const express = require("express");
const router = express.Router();
const { createPaymentIntent, createCheckoutSession, paymentstatus } = require("../Controller/PaymentController");

// POST endpoint to create a Payment Intent
router.post("/create-payment-intent", createPaymentIntent);
router.post("/create-checkout-session", createCheckoutSession);
router.get("/session-status",paymentstatus);
module.exports = router;
