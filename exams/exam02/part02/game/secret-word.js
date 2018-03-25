const gameLogic = require('./game-logic');

module.exports = (req, res)=>{

    // creates a session and sends a secret word with id to client
    const session = {};

    session.id = gameLogic.getUniqueId();
    session.secret = gameLogic.pickWord();
    session.createdAt = Date.now();
    session.updatedAt = Date.now();
    session.guessHistory = [];

    gameLogic.addSession( session );
    gameLogic.deleteSessionAfterTimeOut(session);
    
    res.status(200).json({
        id: session.id,
        secret : session.secret
    });
};
