require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect to database
connectDB();

const app = express();

// CORS config
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:1234',
  credentials: true,
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  allowedHeaders: ['Authorization', 'Content-Type'],
}));


// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authroutes"));
app.use("/api/watchlist", require("./routes/watchlistroutes"));
app.use("/api/favlist", require("./routes/favlistroutes"));

// Health check
app.get("/api", (req, res) => {
  res.send("Movie Clone Backend API is running 🚀");
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || "Something went wrong" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
