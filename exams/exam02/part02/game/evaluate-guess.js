const gameLogic = require('./game-logic');

module.exports = (req, res) => {
    // evaluates the guess sent by the opponent
    const sessionId = req.params.id;

    if( !gameLogic.getSession( sessionId )){
        res.status(400).send( 'not a valid id' );
        return;
    }

    const guess = req.params.guess;
    if( !guess ){
        res.status(404).send('req should contain a guess' );
        return;
    }

    if( !gameLogic.isValidGuess( guess.toUpperCase() )){
        res.status(400).send('not a valid guess');
        return;
    }

    const word = gameLogic.getSession( sessionId ).secret;

    const matched = gameLogic.getNoOfLettersMatched( guess.toUpperCase(), word.toUpperCase() );

    const hasWon = (matched === word.length);

    res.status(200).json({
        matched : matched,
        hasWon : hasWon
    });

};
