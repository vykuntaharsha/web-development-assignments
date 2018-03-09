const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 4000;

const data = require('./wordList');
const evaluateGuess = require('./evaluateGuess');
const isValidId = require('./validateFunctions').isValidId;
const isValidGuess = require('./validateFunctions').isValidGuess;

// setting the app to use bodyparser and static files
app.use(express.static('public'));
app.use(bodyParser.json({ extended: true, type: '*/*' }));

//setting the configuration to print pretty.
app.set('json spaces', 2);

app.get('/secretWord', (req, res) => {

    const wordsWithId = data.wordsWithId;
    const word = wordsWithId[Math.floor( Math.random() * wordsWithId.length )];
    res.status(200).json({ id : word.id });
});

app.get('/wordList', (req, res) => {
    res.status(200).json({ wordList : data.words });
});

app.post('/evaluateGuess', (req, res) => {

    const guess = req.body.guess;
    const id = req.body.id;

    if( !guess || !id ){
        res.status(400).send('valid request body should contain guess and id');
        return;
    }

    if( !isValidId(id) ) {
        res.status(406).send('please provide a valid ID');
        return;
    }

    if( !isValidGuess(guess) ){
        res.status(406).send('please provide a valid Guess with 6 letters');
        return;
    }

    const result = evaluateGuess( guess, id );
    res.status(200).json({ result : result });

});


app.listen(PORT , () =>{
    console.log(`guess-server listening at http://localhost:${PORT}`);
    console.log('Press ctrl-c to stop the server');
});
