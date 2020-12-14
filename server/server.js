const express = require('express');
const Twitter = require('twit');
var cors = require('cors')
const app = express();
app.use(cors())

app.listen(3000, () => console.log('Server running'))

const client = new Twitter({
    consumer_key: 'EqM50UQ7FRSIyLlK6PfcaoLSP',
    consumer_secret: 'QCZjv1b6IbT3muYxctYudu4zLgP7zdLnBg304oPcWer1lRndOA',
    access_token: '1037403707317600258-LqqLI6FqOQo9a6vBm46xVEJ7wzRici',
    access_token_secret: 'l5A8dioo02sSbPItM09uzKJzxCO7BcJd2e3mrxTyxyeZO'
});

app.get('/api/tweets', (req, res) => {

    const params = req.query;

    client
    .get(`https://api.twitter.com/1.1/search/tweets.json`, params)
    .then(response => {
        cache = response;
        res.send(response);
    })
    .catch(error => res.send(error));
});

app.get('/api/nextPage', (req, res) => {

    console.log('received request --->', req.query);

    client
    .get(`https://api.twitter.com/1.1/search/tweets.json${req.query.url}`)
    .then(response => {
        cache = response;
        res.send(response);
    })
    .catch(error => res.send(error));
});