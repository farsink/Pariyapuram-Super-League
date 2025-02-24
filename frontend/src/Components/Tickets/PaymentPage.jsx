import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { serverurl } from "../../Api/ServerURL";

function PaymentPage({ ticket }) {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState(null);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  useEffect(() => {
    if (ticket) {
      // Create Payment Intent on backend: convert totalPrice to smallest unit (e.g., multiply by 100 for INR)
      fetch(`${serverurl}/api/payment/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ticketId: ticket._id,
          amount: ticket.totalPrice * 100,
          currency: "inr",
        }),
      })
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret))
        .catch(() => setError("Failed to initialize payment."));
    }
  }, [ticket]);
const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (!stripe || !elements) return;

//   setProcessing(true);

//   const payload = await stripe.confirmCardPayment(clientSecret, {
//     payment_method: { card: elements.getElement(CardElement) },
//   });

//   if (payload.error) {
//     setError(payload.error.message);
//     setProcessing(false);
//   } else {
//     setError("");
//     setProcessing(false);
//     setSucceeded(true);
//     alert("Payment Successful!");
//     // Optionally, trigger further actions like updating ticket status or navigating to a confirmation page.
//   }
};
return (
    <div>
      <h2>Payment</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {clientSecret ? (
        <form onSubmit={handleSubmit}>
          <CardElement />
          <button type="submit" disabled={processing || !stripe}>
            {processing ? "Processing..." : `Pay ₹${ticket.totalPrice}`}
          </button>
        </form>
      ) : (
        <p>Loading payment details...</p>
      )}
      {succeeded && <p>Payment succeeded!</p>}
    </div>
  );

}

export default PaymentPage;
