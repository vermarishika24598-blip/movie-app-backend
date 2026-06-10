const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const authRoutes = require("./routes/authroutes");
const watchlistRoutes = require("./routes/watchlistroutes");
const favlistRoutes = require("./routes/favlistroutes");

const app = express();

// Database Connection
connectDB();

// Body Parser Middleware
app.use(express.json());

// ⚡ Bulletproof Dynamic CORS Configuration
// ⚡ Bulletproof Dynamic CORS Configuration
const allowedOrigins = [
  "https://react-movie-explorer-w35l.vercel.app",
  "http://localhost:5173"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);



// Root Route to check API Status
app.get("/", (req, res) => {
  res.send("Movie Explorer API is running smoothly...");
});

// Routes Middleware
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/favlist", favlistRoutes);

// Global Error Handler for CORS or other internal issues
app.use((err, req, res, next) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "CORS Blocked: Origin not authorized." });
  }
  console.error(err.stack);
  res.status(500).send("Something broke on the server!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});