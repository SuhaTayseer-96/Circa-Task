const Game = require('../models/gameModel');
const generateQuestion = require('../utils/generateQuestion');

exports.startGame = async (req, res) => {
    const { name, difficulty } = req.body;
    const question = generateQuestion(difficulty);

    const newGame = new Game({
        name,
        difficulty,
        questions: [{ question, correctAnswer: eval(question) }],
        currentScore: 0,
        totalTimeSpent: 0
    });

    await newGame.save();
    res.json({
        message: `Hello ${name}, find your submit API URL below`,
        submit_url: `/game/${newGame._id}/submit`,
        question,
        time_started: newGame.createdAt
    });
};

exports.submitAnswer = async (req, res) => {
    const { answer } = req.body;
    const game = await Game.findById(req.params.game_id);
    const questionObj = game.questions[game.questions.length - 1];

    const correct = parseFloat(answer) === questionObj.correctAnswer;
    questionObj.userAnswer = parseFloat(answer);
    questionObj.timeTaken = Date.now() - new Date(game.createdAt).getTime();

    game.currentScore = correct ? game.currentScore + 1 : game.currentScore;
    game.totalTimeSpent += questionObj.timeTaken;
    await game.save();

    res.json({
        result: correct ? `Good job ${game.name}, your answer is correct!` : `Sorry ${game.name}, your answer is incorrect.`,
        time_taken: questionObj.timeTaken,
        current_score: game.currentScore,
        history: game.questions
    });
};

exports.getGameStatus = async (req, res) => {
    const game = await Game.findById(req.params.game_id);
    res.json({
        name: game.name,
        difficulty: game.difficulty,
        current_score: game.currentScore,
        total_time_spent: game.totalTimeSpent,
        history: game.questions
    });
};
