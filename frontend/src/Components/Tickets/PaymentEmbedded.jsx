// components/PaymentEmbedded.jsx
import React, { useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { serverurl } from "../../Api/ServerURL";

// Load Stripe using your publishable key (safe on the client)
const stripePromise = loadStripe(
  "pk_test_51QsjtyKoJsv2Mn0LXjJ0xwEJJl2AXMRMDCrN1CPA5Igaalp21xUBMRYho7AsBiENprTJ6jdkBnPj5RE6a4j6hGmf00XcDf94WQ"
);

const PaymentEmbedded = ({ ticket }) => {
  // fetchClientSecret calls your backend and passes along your ticket data.
  const fetchClientSecret = useCallback(() => {
    return fetch(`${serverurl}/api/payment/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticketData: {
          ticketId: ticket._id,
          matchId: ticket.matchId,
          seatTier: ticket.seatTier,
          quantity: ticket.quantity,
          pricePerTicket: ticket.pricePerTicket,
          totalPrice: ticket.totalPrice,
        },
        mode: "payment",
        return_url: `http://localhost:5173/tickets/confirmation?session_id={CHECKOUT_SESSION_ID}&ticketId=${ticket._id}`,
      }),
    })
      .then((res) => res.json())
      .then((data) => data.clientSecret);
  }, [ticket]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default PaymentEmbedded;
