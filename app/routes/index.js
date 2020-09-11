var express = require('express');
var router = express.Router();
const fetch = require('node-fetch');

router.get('/', function(req, res, next) {
  res.send('hays MERN!')
});

router.get('/test', async function(req, res){
    let url = 'https://api.npms.io/v2/search?q=vue';
    let response = await fetch(url);
    let result = await response.json();
    res.send(result);
});

module.exports = router;