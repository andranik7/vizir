var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/randomGif', function(req, res, next) {
  console.log(req.body)
  res.send("hello")
});


module.exports = router;
