const app = require("./app.js");
const connectDB = require("./Config/db.js");
const client = require("./Config/redis.js");
const dotenv = require("dotenv");

dotenv.config(); // Load environment variables

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Server accessible on http://192.168.1.100:${PORT}`);
});
