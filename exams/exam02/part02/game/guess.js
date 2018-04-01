const gameLogic = require('./game-logic');

module.exports = (req, res) => {
    // takes in the result from client and sends a guess
    const sessionId = req.params.id;
    const matchedLetters = req.body.matched;

    if( !gameLogic.getSession( sessionId ) ){

        if( gameLogic.isSessionDeleted( sessionId )){
            res.status(408).send('session has been deleted due to inactivity')

        }else {
            res.status(400).send('not a valid id');
        }
        return ;
    }

    gameLogic.addResultOfSession( sessionId, matchedLetters);

    const guess = gameLogic.makeGuess( sessionId );

    res.status(200).json({ guess : guess });
};
