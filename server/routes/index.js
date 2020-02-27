var express = require('express');
var router = express.Router(); 
var QRCode = require('qrcode');

QRCode.toDataURL('I am a pony!', function (err, url) {
  console.log(url)
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
