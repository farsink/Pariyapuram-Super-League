const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");

const playerRoutes = require("./Routes/PlayerRoutes");
const TeamRoutes = require("./Routes/TeamRoutes");
const MatchRoutes = require("./Routes/MatchRoute");
const SeasonRoutes = require("./Routes/SeasonRoutes");
const TournamentRoutes = require("./Routes/TournamentRoute");
const NewsRoutes = require("./Routes/NewsRoute");
const SeatsRoutes = require("./Routes/SeatRoutes");
const TicketRoute = require("./Routes/TicketRoute");
const PaymentRoute = require("./Routes/PaymentRoute");
const VideoRoutes = require("./Routes/VideoRoute");
const GalleryRoutes = require("./Routes/GalleryRoute");
dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "*", // Allow necessary headers
  })
);
// Enable CORS

app.options("*", cors());
app.use(morgan("dev")); // Log requests
app.use(bodyParser.json()); // Parse JSON requests

// Helmet configuration for security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// Add Cross-Origin-Resource-Policy header
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

// Static files
app.use("/uploads", express.static("uploads"));
app.use("/news", express.static("uploads/news"));
// Routes
app.use("/api/player", playerRoutes);
app.use("/api/team", TeamRoutes);
app.use("/api/match", MatchRoutes);
app.use("/api/season", SeasonRoutes);
app.use("/api/tournament", TournamentRoutes);
app.use("/api/news", NewsRoutes);
app.use("/api/seats", SeatsRoutes);
app.use("/api/payment", PaymentRoute);
app.use("/api/ticket", TicketRoute);
app.use("/api/video", VideoRoutes);
app.use("/api/gallery", GalleryRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
