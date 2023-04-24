const ProfileController = require('../controllers/ProfileController')
const authentication = require('../middlewares/authentication')

const router = require('express').Router()

router.use(authentication)
router.get  ('/profile', ProfileController.showProfile)


module.exports = router