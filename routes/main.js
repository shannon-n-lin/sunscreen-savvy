const express = require('express')
const router = express.Router()
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')

router.get('/', homeController.getIndex)
router.get('/profile', homeController.getProfile)
router.get('/signup', authController.getSignup)
router.get('/login', authController.getLogin)
router.get('/logout', authController.logout)
router.post('/signup', authController.postSignup)
router.post('/login', authController.postLogin)

module.exports = router