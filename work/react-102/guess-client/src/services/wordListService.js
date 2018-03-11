export const getSecretWordId = () => {
    return fetch('/secretWord')
            .then(res => res.ok ? res.json() : Promise.reject(res.text()) )
            .catch( () => Promise.reject('get-fail') );
};

export const evaluateGuess = ( guess, id ) => {
    return fetch('/evaluateGuess', {
        method : 'POST',
        body : JSON.stringify({
            guess : guess,
            id : id
        })
    })
    .then( res => res.ok ? res.json() : Promise.reject(res.text() ) )
    .catch(() => Promise.reject('evaluation-fail'));
};

export const getWordList = () => {
    return fetch('/wordList')
            .then( res => res.ok ? res.json() : Promise.reject(res.text()) )
            .catch( () => Promise.reject('get-fail') );
};
