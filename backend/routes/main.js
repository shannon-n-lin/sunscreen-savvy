const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const homeController = require('../controllers/home')
const authController = require('../controllers/auth')
const profileController = require('../controllers/profile')
const sunscreensController = require('../controllers/sunscreens')
const searchController = require('../controllers/search')
const { ensureAuth, ensureGuest } = require('../middleware/auth')


router.get('/', homeController.getIndex)
router.get('/user', authController.checkUser)

router.get('/signup', ensureGuest, authController.getSignup)
router.get('/login', ensureGuest, authController.getLogin)
router.post('/logout', authController.logout)

router.post('/signup', authController.postSignup)
router.post('/login', authController.postLogin)

router.get('/profile', ensureAuth, profileController.getProfile)
router.put('/updateProfile', profileController.updateProfile)

router.get('/addSunscreen', ensureAuth, sunscreensController.getAddSunscreen)
router.post('/addSunscreen', upload.single('file'), sunscreensController.postAddSunscreen)

router.get('/sunscreen/:id', sunscreensController.getSunscreen)
router.get('/sunscreens', sunscreensController.getAllSunscreens)

router.get('/search', searchController.searchSunscreens)
router.get('/search/:id', searchController.getSearchResults)

module.exports = router
