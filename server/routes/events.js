var express = require('express')
var router = express.Router()
const eventsController = require('../controllers/eventsController')
const verifyLogin = require('../middlewares/verifyLogin')

router.get('/', verifyLogin.isLogin, eventsController.findAll)
router.post('/', eventsController.create)
router.put('/:id', eventsController.update)
router.delete('/:id', eventsController.destroy) 
// router.put('/:id/join', eventsController.join)

module.exports = router
