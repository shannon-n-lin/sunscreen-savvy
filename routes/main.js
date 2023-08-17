const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const profileController = require('../controllers/profile')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', homeController.getIndex)

router.get('/signup', ensureGuest, authController.getSignup)
router.get('/login', ensureGuest, authController.getLogin)
router.get('/logout', authController.logout)

router.post('/signup', authController.postSignup)
router.post('/login', authController.postLogin)

router.get('/profile', ensureAuth, profileController.getProfile)
router.put('/updateProfile', profileController.updateProfile)

router.get('/skintype', profileController.getSkinType)
router.post('/skintype', profileController.postSkinType)

module.exports = router