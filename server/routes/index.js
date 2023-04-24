const UserController = require('../controllers')

const router = require('express').Router()
const profile = require('./profileRoute.js')

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(profile)

module.exports = router