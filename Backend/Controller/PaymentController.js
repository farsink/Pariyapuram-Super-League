// controllers/paymentController.js
require("dotenv").config();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Your secret key from environment variables
exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount, currency = "inr", ticketId } = req.body;

    // Create a Payment Intent on Stripe with amount (in smallest currency unit) and metadata
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount should be in the smallest currency unit (e.g., paise for INR)
      currency,
      metadata: { ticketId },
    });

    // Return the client secret to the frontend
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating Payment Intent:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.createCheckoutSession = async (req, res) => {
  try {
    // Expect ticketData sent from your frontend
    const { ticketData, mode, return_url } = req.body;
    // Example structure of ticketData:
    // {
    //    ticketId: "67b9e44f013991761fbb55b3",
    //    matchId: "67a9e8c1ad8f99aeabcd89fb",
    //    seatTier: "VIP",
    //    quantity: 4,
    //    pricePerTicket: 200,
    //    totalPrice: 800
    // }

    // Create a Checkout Session using dynamic price data
    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              // Customize the product name and description using your ticket data
              name: `Ticket Purchase for Match ${ticketData.matchId}`,
              description: `Seat Tier: ${ticketData.seatTier}`,
            },
            unit_amount: ticketData.pricePerTicket * 100, // amount in paise
          },
          quantity: ticketData.quantity,
        },
      ],
      mode: mode || "payment",
      return_url: return_url, // e.g., "http://localhost:3000/return?session_id={CHECKOUT_SESSION_ID}"
      metadata: { ticketId: ticketData.ticketId },
    });

    res.json({ clientSecret: session.client_secret });
  } catch (error) {
    console.error("Error creating Checkout Session:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.paymentstatus = async (req, res) => {
    try {
      const sessionId = req.query.session_id;
      if (!sessionId) {
        return res.status(400).json({ error: "session_id query parameter is required" });
      }

      const session = await stripe.checkout.sessions.retrieve(sessionId);
      res.json({
        status: session.payment_status, // e.g., 'paid' if successful
        customer_email: session.customer_details ? session.customer_details.email : null,
      });
    } catch (error) {
      console.error("Error retrieving session:", error);
      res.status(500).json({ error: error.message });
    }
};
