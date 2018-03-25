const router = require('express').Router();
const secretWord = require('./secret-word');
const guess = require('./guess');
const evaluateGuess = require('./evaluate-guess');
const deleteGameSession = require('./delete-session');

// routes to different sections based on url
router.post('/', secretWord);
router.put('/:id/guessed', guess );
router.get('/:id/guess/:guess', evaluateGuess);
router.delete('/:id', deleteGameSession);

module.exports = router;
