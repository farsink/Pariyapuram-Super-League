const app = require("./app.js");
const connectDB = require("./Config/db.js");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`,);
});
