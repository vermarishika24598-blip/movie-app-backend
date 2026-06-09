const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    movieId: {
      type: String,
      required: true
    },
    title: String,
    poster: String
  },
  { timestamps: true }
);

// ✅ ABSOLUTE protection against recompile
module.exports =
  mongoose.models.Watchlist ??
  mongoose.model("Watchlist", watchlistSchema);
