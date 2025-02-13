// scripts/updatePlayerCards.js

const connectDB = require("../Config/db"); // Adjust path to your db.js file
const Match = require("../Models/Match"); // Adjust path as needed
const mongoose = require("mongoose");
const Player = require("../Models/Player"); // Adjust path as needed

(async () => {
  try {
    // Connect to MongoDB using the connectDB function
    await connectDB();
    console.log("Connected to database");

    // Fetch all matches with cards data
    const matches = await Match.find().populate("cards.player");

    for (const match of matches) {
      for (const card of match.cards) {
        const { player, cardType } = card;

        if (cardType === "yellow") {
          await Player.findByIdAndUpdate(player._id, { $inc: { "stats.yellowCards": 1 } });
        } else if (cardType === "red") {
          await Player.findByIdAndUpdate(player._id, { $inc: { "stats.redCards": 1 } });
        }
      }
    }

    console.log("Player cards updated successfully");
    const player = await Player.find();
    console.log(player);
  } catch (error) {
    console.error("Error updating player cards:", error.message);
  } finally {
    // Close the database connection
    await mongoose.connection.close();
    console.log("Database connection closed");
  }
})();
