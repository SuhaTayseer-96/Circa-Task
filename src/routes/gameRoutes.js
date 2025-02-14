const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.post('/start', gameController.startGame);
router.post('/:game_id/submit', gameController.submitAnswer);
router.get('/:game_id/status', gameController.getGameStatus);

module.exports = router;
