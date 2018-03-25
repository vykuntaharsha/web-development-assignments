const express = require('express');
const app = express();

//assigning barbara port from config
const hosts = require('./src/config.json');
const barbara = Object.keys(hosts)[1];
const PORT =  hosts[barbara].substr( hosts[barbara].lastIndexOf(':')+1 ) || 8888;


//setting the app to use body parser
const bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit : '10kb',
    extended : true
}));

//setting json spaces of app
app.set('json spaces', 2);

//allowing all clients to access the urls
app.use('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
       res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
       res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

       next();
});

const game = require('./game');
app.use('/game', game);

app.listen(PORT, () => {
    console.log(`barbara listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});
