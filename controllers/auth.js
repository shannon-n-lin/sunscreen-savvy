const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')

const getSignup = (req, res) => {
  res.render('signup.ejs')
}

const postSignup = (req, res) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) {
      validationErrors.push({ msg: 'Please enter a valid email address' })
  }
  if (!validator.isLength(req.body.password, { min: 8 })) {
    validationErrors.push({ msg: 'Password must be at least 8 characters long' })
  }
  if (req.body.password !== req.body.confirmPassword) {
    validationErrors.push({ msg: 'Passwords do not match' })
    console.log('Passwords do not match')
  }

  // If there are any errors, flash messages
  if (validationErrors.length) {
    console.log(validationErrors)
    req.flash('errors', validationErrors)
    return res.redirect('/signup')
  }

  // Sanitize email addresses 
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_lowercase: true,
    gmail_remove_dots: true,
    outlookdotcom_lowercase: true,
    yahoo_lowercase: true,
    icloud_lowercase: true,
  })

  // Set up info for new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })

  async function checkUser() {
    try {
      // Check if username or email address already exists in db
      let data = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username}] })
      if (data) {
        console.log('An account with that email address or username already exists')
        req.flash('errors', { msg: 'An account with that email address or username already exists' })
        return res.redirect('../signup')
      } 
      // Otherwise, save new user to database
      await user.save()
      // TODO: log in new user

    } catch (err) {
      console.log(err)
    }
  }
  checkUser()
}

const getLogin = (req, res) => {
  res.render('login.ejs')
}

const postLogin = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: 'Please enter a valid email address'})
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: 'Please enter a password'})

  // If there are any errors, flash messages
  if (validationErrors.length) {
    req.flash('errors', validationErrors)
    return res.redirect('/login')
  }

  // Sanitize email addresses 
  req.body.email = validator.normalizeEmail(req.body.email, {
    gmail_lowercase: true,
    gmail_remove_dots: true,
    outlookdotcom_lowercase: true,
    yahoo_lowercase: true,
    icloud_lowercase: true,
  })

  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) {
      req.flash('errors', info)
      return res.redirect('/login')
    }
    req.logIn(user, (err) => {
      if (err) return next(err)
      console.log(`${req.body.email} is logged in`)
      req.flash('success', { msg: 'Welcome!' })
      // res.redirect(req.session.returnTo || '/profile')
      res.redirect('/profile')
    })
  }) (req, res, next)
}

const logout = (req, res) => {
  req.logout(function(err) { 
    console.log('User has logged out')
    if (err) {return next(err)}
    res.redirect('/') 
  })
}

module.exports = {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  logout,
}
