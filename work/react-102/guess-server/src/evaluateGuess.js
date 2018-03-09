const gameStatus = require('./gameStatusCodes');
const data = require('./wordList');

function evaluateGuess( guess, id) {
    //finding the secret word from initial data by id.
    const secretWord = data.wordsWithId.find( word => word.id === id ).word;

    // creating a result object to pass in responce
    const result = {};

    // setting the number of common letters in result.
    result.noOfCommonLetters = countCommonLetters( guess.toUpperCase(), secretWord.toUpperCase() );

    // setting the game status. If user matches the secretWord then he has won.
    result.status = ( guess.toUpperCase() === secretWord.toUpperCase() ) ? gameStatus.won : gameStatus.playing;

    return result;
}

function countCommonLetters( guess, word ) {
    // counts number of common letters between the words passed.
    let commonLettersCount = 0;
    const commonLetterOccarances = {};

    for( letter of word ) {
        if(commonLetterOccarances[letter]){
            commonLetterOccarances[letter] += 1;
        }else {
            commonLetterOccarances[letter] = 1;
        }
    }

    for( letter of guess ) {
        if(commonLetterOccarances[letter]){
            commonLetterOccarances[letter] -= 1;
            commonLettersCount += 1;
        }
    }

    return commonLettersCount;
}
module.exports = evaluateGuess;
