const baseWord = 'PARTS';

const guesses = ['TREES', 'TEASE', 'START', 'STRAP', 'LEVEL', 'PARTS'];

function countLettersInPosition( word , guess ) {
    let count = 0;
    for (let position in word) {
        if ( word[position] === guess[position] ) {
            count += 1;
        }
    }
    return count;
}

function countCommonLetters( word , guess ) {
    let count = 0;
    const letterOccurances = {};

    for ( letter of word ) {
        if( !letterOccurances[letter] ){
            letterOccurances[letter] = 1;
            continue;
        }
        letterOccurances[letter] += 1;
    }

    for ( letter of guess ) {
        if( letterOccurances[letter] > 0){
            letterOccurances[letter] -= 1;
            count += 1;
        }
    }

    return count;
}

function printResultsInOrder( word , guesses ) {

    for (guess of guesses) {
        console.log(word + ' ' + guess + ' ' + countLettersInPosition( word , guess ) + ' ' + countCommonLetters( word , guess ));
    }

}

printResultsInOrder( baseWord , guesses );
