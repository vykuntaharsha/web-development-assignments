export const postGame = ( hostName ) => {
    //posts to server and gets an id and secret word in return
    return fetch(`${hostName}/game`, {
        method : 'POST',
        headers: {
           'content-type': 'application/json'
       }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.text()))
    .catch(() => Promise.reject('post-fail'));
};

export const putGameGuess = (hostName, id, data) => {
    //puts the result for the previous guess and gets a guess in return
    return fetch( `${hostName}/game/${id}/guessed`, {
        method: 'PUT',
        body : JSON.stringify(data),
        headers: {
           'content-type': 'application/json'
       }
    })
    .then(res => res.ok ? res.json() : Promise.reject(res.text() ))
    .catch( () => Promise.reject('put-fail') );
};

export const getResult = (hostName, id, guess) => {
    // gets a result for the opponent's guess
    return fetch(`${hostName}/game/${id}/guess/${guess}`)
    .then(res => res.ok ? res.json() : Promise.reject(res.text()))
    .catch(() => Promise.reject('get-fail'));
};

export const deleteGameSession = (hostName, id) => {
    // deletes any session on server
    return fetch(`${hostName}/game/${id}`, {
        method: 'DELETE',
        headers: {
           'content-type': 'application/json'
       }
    })
    .then(res => res.ok ? null : Promise.reject(res.text()) )
    .catch(() => Promise.reject('delete-fail'));
};
