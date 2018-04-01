const gameLogic = require('./game-logic');

module.exports = (req, res) => {
    // deletes the session of that specific id
    const sessionId = req.params.id;

    if( !gameLogic.getSession(sessionId) && !gameLogic.isSessionDeleted(sessionId) ){
        res.status(404).send('not a valid id');
        return;
    }

    gameLogic.deleteSession( sessionId );
    res.sendStatus(200);
};
