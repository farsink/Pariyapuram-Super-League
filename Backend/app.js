const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const playerRoutes = require("./Routes/PlayerRoutes");
const TeamRoutes = require("./Routes/TeamRoutes");
const MatchRoutes = require("./Routes/MatchRoute");
const SeasonRoutes = require("./Routes/SeasonRoutes");
const TournamentRoutes = require("./Routes/TournamentRoute");
// const errorHandler = require("./utils/errorHandler");

dotenv.config();

const app = express();

// Middleware
app.use(cors()); // Enable CORS
app.use(helmet()); // Set security headers
app.use(morgan("dev")); // Log requests
app.use(bodyParser.json()); // Parse JSON requests
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded requests

// Routes
app.use("/api/player", playerRoutes);
app.use("/api/team", TeamRoutes);
app.use("/api/match", MatchRoutes);
app.use("/api/season", SeasonRoutes);
app.use("/api/tournament", TournamentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
