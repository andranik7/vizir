const express = require('express');
const router = express.Router();


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
      res.writeHead(200, {'Content-Type': 'image/gif' });
      console.log(gifs[0].images.fixed_height.url)
      res.end(gifs[0].images.fixed_height.url);
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
