const express = require('express');
const app = express();

//assigning alfred port from config
const hosts = require('./src/config.json');
const alfred = Object.keys(hosts)[0];
const PORT =  hosts[alfred].substr( hosts[alfred].lastIndexOf(':')+1 ) || 8080;

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
       res.header('Access-Control-Allow-Headers', 'Content-Type');

       next();
});


const game = require('./game');
app.use('/game', game);

app.listen(PORT, () => {
    console.log(`alfred listening at http://localhost:${PORT}`);
    console.log('use Ctrl-C to stop this server');
});
