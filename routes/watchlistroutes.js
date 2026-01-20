const express=require("express");
const router=express.Router();
const Watchlist = require("../models/watchlist");
const protect = require("../middleware/authmiddleware");


router.get("/test", (req, res) => {
  res.send("Watchlist router works!");
});

// Add movie to watchlist
router.post("/add", protect, async (req, res) => {
  try {
    const { movieId, title, poster } = req.body;

    if (!movieId || !title) {
      return res.status(400).json({ message: "movieId and title are required" });
    }

    const existing = await Watchlist.findOne({
      userId: req.user._id,
      movieId,
    });

    if (existing) {
      return res.status(400).json({ message: "Movie already in watchlist" });
    }

    const newMovie = await Watchlist.create({
      userId: req.user._id,
      movieId,
      title,
      poster,
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Add to watchlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get user's watchlist
router.get("/", protect, async (req, res) => {
  try {
    const watchlist = await Watchlist.find({ userId: req.user._id });
    res.status(200).json(watchlist);
  } catch (error) {
    console.error("Fetch watchlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Remove movie from watchlist
router.delete("/:movieId", protect, async (req, res) => {
  try {
    const deleted = await Watchlist.findOneAndDelete({
      userId: req.user._id,
      movieId: req.params.movieId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Movie not found in watchlist" });
    }

    res.json({
      message: "Removed from watchlist",
      movieId: req.params.movieId,
    });
  } catch (error) {
    console.error("Delete watchlist error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

