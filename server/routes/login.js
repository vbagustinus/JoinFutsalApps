const express = require('express')
const router = express.Router()
const User = require('../controllers/usersController');
const FB = require('fb');
FB.options({version: 'v2.8'});

const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.accesstoken);
  next()
}
/* GET home page. */
router.get('/', setAccessToken, (req, res) => {
  FB.api('/me', {
    message: req.body.status,
    fields: 'name,last_name,first_name,email,gender,picture'
  }, function(response) {
    User.create(response)
    .then((token) => res.send({tokenJwt:token}))
    .catch(err => res.status(500).send(err))
  })
});

module.exports = router
