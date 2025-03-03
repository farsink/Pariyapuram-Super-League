import React, { useRef, useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const TicketScanner = () => {
  const [scannedData, setScannedData] = useState("");
  const [details, setdetails] = useState([]);
  const scannedTicketRef = useRef([]);
  const navigate = useNavigate();
const {tickets} = useSelector((state) => state.tickets);

  // Example: Expected valid ticket id for verification
  const allowedTicketIds = tickets?.filter((ticket) => ticket.paymentStatus === "paid").map((ticket) => ticket._id) || [];

  // Simulated ticket verification function.
  const verifyTicket = (ticketId) => {
    if (allowedTicketIds.includes(ticketId)) {
      if (scannedTicketRef.current.includes(ticketId)) {
        Swal.fire("Error", "The same ticket cannot be used for multiple persons!", "error");
      } else {
        // Immediately update the ref with the new ticket ID
        scannedTicketRef.current.push(ticketId);
        
        Swal.fire("Ticket Verified", "Your ticket is valid and paid!", "success");
      }
    } else {
      Swal.fire("Ticket Not Verified", "The scanned ticket is not valid or is unpaid.", "error");
    }
  };
  const handleScan = (result) => {
    if (result) {
      // The new Scanner returns an array; get the first scanned result's rawValue.
      const rawValue = result[0]?.rawValue || "";

      // Add the new scanned data to the existing array
      setScannedData((prevData) => [...prevData, rawValue]);

      // Verify the scanned ticket id
      verifyTicket(rawValue);
      setdetails((prevTickets) => [
        ...prevTickets,
        tickets?.find((ticket) => ticket._id === rawValue),
      ]);
    }
  };

  // Navigate back to the tickets page
  const handleBack = () => {
    navigate("/admin/tickets");
  };

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      {/* Back button */}
      <button
        onClick={handleBack}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          background: "#6366f1",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Back
      </button>

      <h2 style={{ marginBottom: "1rem" }}>QR Code Scanner</h2>

      {/* Scanner container with decreased size for a minimal look */}
      <div
        style={{
          width: "250px",
          height: "250px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          overflow: "hidden",
          marginBottom: "1rem",
        }}
      >
        <Scanner onScan={handleScan} scanDelay={7000} allowMultiple={true} />
      </div>

      <div style={{ fontSize: "0.9rem", color: "#333" }}>
        <strong>Ticket Details:</strong>
        {details?.map((ticket, index) => (
          <div key={index}>
            <p>Ticket ID: {ticket._id}</p>
            <p>User ID: {ticket.userId}</p>
            <p>Match ID: {ticket.matchId}</p>
            <p>Seat Tier: {ticket.seatTier}</p>
            <p>Quantity: {ticket.quantity}</p>
            <p>Price Per Ticket: {ticket.pricePerTicket}</p>
            <p>Total Price: {ticket.totalPrice}</p>
            <p>Payment Status: {ticket.paymentStatus}</p>
            <p>Status: {ticket.status}</p>
            <p>Booking Date: {ticket.bookingDate}</p>
            <p>Payment ID: {ticket.paymentId}</p>
          </div>
        ))}
      </div>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default TicketScanner;
