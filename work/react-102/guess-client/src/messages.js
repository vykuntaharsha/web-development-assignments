const messages = {
    'player-won': 'Congratulations you guessed it correct',
    'get-fail': 'Failed to load secret word. Check your network connection and try again.',
    'evaluation-fail': 'Failed to evaluate your guess. Enter a 5 letter word and try again.',
    'generic-error': 'Uh-oh, something bad happened'
};

export const pickErrorMessage = message => {
    if(!message) {
        return '';
    }
    message = messages[message] ? message : 'generic-error';
    return messages[message];
}
