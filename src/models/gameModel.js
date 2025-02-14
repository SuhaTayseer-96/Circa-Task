const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    name: String,
    difficulty: Number,
    questions: [
        {
            question: String,
            correctAnswer: Number,
            userAnswer: Number,
            timeTaken: Number
        }
    ],
    currentScore: Number,
    totalTimeSpent: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', GameSchema);
