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
    console.log(data)
    console.log(err)
    if(!err){
      if(data.data.length>0){
        let gifs = data.data // on récupère tous les gif
        let random = gifs[Math.floor(Math.random()*gifs.length)];
        let url = random.images.preview_gif.url;

        // on envoie un attachement pour que slack affiche le gif
        let attachement = {
            "attachments": [
                {
                    "image_url": url,
                    "thumb_url": url
                }
            ]
        }

        res.json(attachement)

      }else{
        // aucun gif trouvé
        res.send("Aucun gif trouvé avec ce mot")
      }

    }else{
      res.send("Quelque chose s'est mal passée dans la requête :(")
    }
  });

});



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
