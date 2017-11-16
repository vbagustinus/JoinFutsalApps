var express = require('express')
var router = express.Router()
const eventsController = require('../controllers/eventsController')

router.get('/', eventsController.findAll)
router.post('/', eventsController.create)
router.put('/:id', eventsController.update)
router.delete('/:id', eventsController.destroy) 

module.exports = router