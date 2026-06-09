const express = require("express");
const router = express.Router();
const Favlist = require("../models/favlist");
const protect = require("../middleware/authmiddleware");

// ===================== GET USER'S FAVOURITES =====================



router.get("/fav", (req, res) => { res.send("favlist router works!"); });
router.get("/", protect, async (req, res) => {
  try {
    const favourites = await Favlist.find({ userId: req.user._id });
    res.status(200).json(favourites);
  } catch (error) {
    console.error("Fetch favourites error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== ADD TO FAVOURITES =====================
router.post("/add", protect, async (req, res) => {
  try {
    const { movieId, title, poster } = req.body;

    if (!movieId || !title) {
      return res.status(400).json({ message: "movieId and title are required" });
    }

    const existing = await Favlist.findOne({
      userId: req.user._id,
      movieId,
    });

    if (existing) {
      return res.status(400).json({ message: "Movie already in favourites" });
    }

    const newMovie = await Favlist.create({
      userId: req.user._id,
      movieId,
      title,
      poster,
    });

    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Add to favourites error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ===================== REMOVE FROM FAVOURITES =====================
router.delete("/:movieId", protect, async (req, res) => {
  try {
    const deleted = await Favlist.findOneAndDelete({
      userId: req.user._id,
      movieId: req.params.movieId,
    });

    if (!deleted) {
      return res.status(404).json({ message: "Movie not found in favourites" });
    }

    res.status(200).json({
      message: "Removed from favourites",
      movieId: req.params.movieId,
    });
  } catch (error) {
    console.error("Delete favourites error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
