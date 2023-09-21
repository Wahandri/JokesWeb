const mongoose = require('mongoose');

const jokeSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, "Text of joke is required"],
    unique: true,
  },
  author: {
    type: String,
    default: "Anonymous",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  score: {
    type: Number,
    default: 0, // Inicialmente, la puntuación es 0
  },
  userScores: [
    {
      email: {
        type: String,
      },
      score: {
        type: Number,
        min: 0,
        max: 5,
      },
    },
  ],
});

module.exports = mongoose.model("Joke", jokeSchema);
