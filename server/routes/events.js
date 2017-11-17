var express = require('express')
var router = express.Router()
const eventsController = require('../controllers/eventsController')
const verifyLogin = require('../middlewares/verifyLogin')
const setAccessToken = (req, res, next) => {
  FB.setAccessToken(req.headers.accesstoken);
  next()
}

router.get('/', eventsController.findAll)
router.post('/', eventsController.create)
router.put('/:id', eventsController.update)
router.delete('/:id', eventsController.destroy)
router.put('/:id/join', eventsController.join)

module.exports = router
