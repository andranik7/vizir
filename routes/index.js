const express = require('express');
const router = express.Router();
const request = require('request').defaults({ encoding: null });


let key = "x9F6yyXvxdSqqj0rN0L0kFDVRBWimmAe" // clé api Giphy
// Require with custom API key
let giphy = require('giphy-api')(key);





// router pour récupérer la requête post depuis Slack
router.post('/randomGif', function(req, res, next) {
  let command = req.body.command;
  let text = req.body.text;

  // faire une recherche giphy avec l'api
  giphy.search(text, function (err, data) {
    // si tout va bien
    if(!err){
      let gifs = data.data

      //data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
      // on récupère la base64 de l'image avec une requete get
      request.get(gifs[0].images.fixed_height.url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
              data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
              res.writeHead(200, {'Content-Type': 'image/gif' });
              res.end(data, 'binary');
          }
      });

    }else{
      res.send("Pas de gif trouvé :(")
    }
  });

});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
