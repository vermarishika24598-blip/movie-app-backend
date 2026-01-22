require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Connect to database
connectDB();

const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:1234",
  "https://spiffy-naiad-981ec7.netlify.app"
];

// CORS config
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
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
