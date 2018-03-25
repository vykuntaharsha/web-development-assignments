const wordlist = require('../wordlist');

//sessions to hold different sessions of the games
const sessions = [];
const deletedSessionIds = [];

function addSession( session ) {
    // adds a session by creating required fields during the game progress
    session.doNotIncludeLetters = [];
    session.targetWords = wordlist;
    sessions.push(session);
}

function getSession( id ) {
    //returns a session reference of that id
    return sessions.find( session => session.id === id );
}

function deleteSession( id ) {
    // deletes any session assosciated to that id
    const index = sessions.findIndex( session => session.id === id);
    if(index >= 0) {
        sessions.splice(index, 1);
        deletedSessionIds.push(id);
    }

}
function isSessionDeleted( sessionId ) {
    //return true if the session assosciated to that id is deleted
    return !!deletedSessionIds.find( id => id === sessionId );
}

function deleteSessionAfterTimeOut(session) {
    //deletes the session after a specific time
    const timeAfterUpdate = Date.now() - session.updatedAt;

    if(timeAfterUpdate > 50000){
        deleteSession(session.id);
    }else {
        setTimeout( () => {
            deleteSessionAfterTimeOut(session);
        }, 50000);
    }
}

function getUniqueId(){
    // returns a uniqueId every time
    const uniqueId =  Math.random().toString(36).substr(2,8).toUpperCase();

    const foundId = sessions.find( session => session.id === uniqueId );
    if( foundId ) return getUniqueId();

    return uniqueId;
}

function pickWord() {
    // picks a word randomly from wordlist
    return getRandomWordFrom(wordlist);
}

function addResultOfSession( id , matchedLetters ) {
    // adds the result sent to end of the session's history
    const index = getSession(id).guessHistory.length-1;

    if(index >= 0){
        getSession(id).guessHistory[index].matched = matchedLetters;
        getSession(id).updatedAt = Date.now();
    }

}

function getNoOfLettersMatched( word, guess ) {
    // returns no of matched letters between word and guess
    let noOfMatch = 0;
    const letterOccurances = {};

    for (letter of word) {
        if(letterOccurances[letter]){
            letterOccurances[letter] += 1;
        }else {
            letterOccurances[letter] = 1;
        }
    }

    for (letter of guess) {
        if(letterOccurances[letter]){
            noOfMatch += 1;
            letterOccurances[letter] -= 1;
        }
    }

    return noOfMatch;
}

function isValidGuess( guess ) {
    // checks if guess is from the provided list
    return wordlist.find( word=> word === guess);
}

function getRandomWordFrom( list ) {
    // returns a random word from the passed list
    return list[Math.floor( Math.random() * list.length)];
}

function makeGuess( id ){

    // returns a guess based on the previous results

    const session = getSession(id);
    const history = session.guessHistory;

    //latest result received from client
    const lastResult = history[history.length-1];

    if(lastResult){
        // we remove the last result from our target words as it is not successful
        const indexOfLastGuess = session.targetWords.findIndex( word => word === lastResult.guess );

        session.targetWords.splice(indexOfLastGuess, 1);

        if(lastResult.matched === 0){
            // if matched is 0 then we can discard all words that include these letters, so add to the doNotInclude list
            lastResult.guess.split('').forEach( letter => session.doNotIncludeLetters.push( letter ));
        }
    }

    // remove any words that contain letters from doNotInclude list
    session.targetWords = filterByLetters( session.targetWords, session.doNotIncludeLetters);

    // filter the words that match the combinations of previous guesses
    session.targetWords = doByCombinations(session);

    //get a random guess from target words
    const guess = getRandomWordFrom( session.targetWords)

    //store that in history and update the target words of the session
    getSession(id).guessHistory.push({ guess });
    getSession(id).targetWords = session.targetWords;
    getSession(id).updatedAt = Date.now();
    return guess;
}

function doByCombinations( session ) {
    // aux function for filterByCombinations,
    // gets combinations of each previous guess and filter out the words that include all of that combinations
    const combinations = [];

    session.guessHistory.forEach( result => {
        if( result.matched > 0){
            const combination = getCombinations( result.guess, result.matched);
            combinations.push(combination);
        }
    });

    return  filterByCombinations(session.targetWords, combinations);
}


function getCombinations(word, value){
    // returns combinations of the specific word, with a length of the matched letters
    const chars = word.split('');
    const combinations = new Set();
    const makeCombinations = (prefix, chars) => {
        for (var i = 0; i < chars.length; i++) {
            combinations.add(prefix + chars[i]);
            makeCombinations(prefix + chars[i], chars.slice(i + 1));
        }
    }
    makeCombinations('', chars);
return [...combinations].filter( item => item.length === value);
}


function filterByLetters(list, doNotInclude) {
    // filters out the words of the list that contain the letters in doNotInclude list
    if(!doNotInclude) return list;
    return list.filter( word => wordDoesNotInclude(word, doNotInclude));
}

function wordDoesNotInclude( word , doNotInclude ) {
    //checks if a word contains letters from doNotInclude list
    const letters = word.split('');

    for (let i = 0; i < letters.length; i++) {
        for (let j = 0; j < doNotInclude.length; j++) {
            if(letters[i] === doNotInclude[j]) return false;
        }
    }

    return true;
}


function filterByCombinations( list, combinations ) {
    // filters by the combinations provided
    return list.filter( word => matchCombinations( word, combinations));
}


function matchCombinations( word, combinations) {
    // checks if a word matches all the combinations
    let totalMatches = 0;

    for (combination of combinations) {
        let countMatchPerCombination  = 0;
        for (item of combination) {
            if( match(word, item))  countMatchPerCombination += 1;
        }
        if(countMatchPerCombination === 0) return false;
        totalMatches += 1;

    }
    if( totalMatches !== combinations.length ) return false;

    return true;
}


function match(word, combination) {
    // checks if the combination is matched with the word
    return getNoOfLettersMatched( word, combination)  === combination.length;
}


module.exports = {
    addSession,
    getSession,
    deleteSession,
    deleteSessionAfterTimeOut,
    isSessionDeleted,
    getUniqueId,
    pickWord,
    makeGuess,
    addResultOfSession,
    getNoOfLettersMatched,
    isValidGuess
};
