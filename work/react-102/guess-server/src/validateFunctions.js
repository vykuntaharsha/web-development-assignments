const data = require('./wordList');

function isValidId( id ) {
    const foundId = data.wordsWithId.find( word => word.id === id);
    if( foundId ) return true;

    return false;
}

function isValidGuess( guess ) {
    return guess.length === 5;
}

module.exports = {
    isValidId,
    isValidGuess
};
