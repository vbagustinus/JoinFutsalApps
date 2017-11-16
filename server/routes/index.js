const express = require('express')
const router = express.Router()
const FB = require('fb');
FB.options({version: 'v2.8'});

/* GET home page. */
router.get('/', function(req, res, next) {
  FB.setAccessToken(req.headers.accesstoken);
  next()
}, (req, res) => {
  FB.api('/me/feed', 'post', {
    message: req.body.status
  }, function(response) {
    res.send(response)
  })
});

module.exports = router
