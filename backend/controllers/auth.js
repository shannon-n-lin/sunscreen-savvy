const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const Profile = require('../models/Profile')

const checkUser = async (req, res) => {
  try {
    if (req.user) {
      res.json(req.user);
    } else {
      res.json('No user logged in')
    }
  }
  catch (err) {
    console.log(err)
  }
}

const getSignup = (req, res) => {
  res.render('signup.ejs')
}

const postSignup = (req, res) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) {
      validationErrors.push({ msg: 'Please enter a valid email address with this format: name@email.com.' })
  }
  if (!validator.isLength(req.body.password, { min: 8 })) {
    validationErrors.push({ msg: 'Please enter a password that is at least 8 characters long.' })
  }
  if (req.body.password !== req.body.confirmPassword) {
    validationErrors.push({ msg: 'The passwords you entered do not match. Please try again.' })
    console.log('Passwords do not match')
  }

  // If there are any errors, flash messages
  if (validationErrors.length) {
    console.log(validationErrors)
    req.flash('errors', validationErrors)
    return validationErrors
    // return res.redirect('/signup')
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
    password: req.body.password,
  })

  async function saveUser() {
    try {
      // Check if username or email address already exists in database
      let data = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username}] })
      if (data) {
        console.log('An account with that email address or username already exists.')
        req.flash('errors', { msg: 'An account with that email address or username already exists.' })
        return res.redirect('../signup')
      } 
      // Otherwise, save new user to database
      await user.save()
      // Then log in new user and redirect to profile page
      await req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        console.log(`${req.body.email} account created`)
        req.flash('success', { msg: 'Welcome!' })
        res.redirect('/profile')
      })
      // Save new profile for user
      const profile = new Profile({
        userId: req.user.id,
        skinType: 'none selected',
        skinTone: 'none selected',
        skinConcern: 'none selected',
      })
      await profile.save()
    } catch (err) {
      console.log(err)
    }
  }
  saveUser()
}

const getLogin = (req, res) => {
  res.render('login.ejs')
}

const postLogin = (req, res, next) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email))
    validationErrors.push({ msg: 'Please enter a valid email address with this format: name@email.com.'})
  if (validator.isEmpty(req.body.password))
    validationErrors.push({ msg: 'Please enter a password to log in.'})

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
    if (err) throw err
    if (!user) {
      res.send(info)
    } else {
      req.logIn(user, (err) => {
        if (err) throw err
        res.send(user)
        console.log(`${req.body.email} is logged in`)
      })
    }
  }) (req, res, next)
}

const logout = (req, res) => {
  req.logout()
  req.session.destroy((err) => {
    if (err)
      console.log("Error : Failed to destroy the session during logout.", err);
    req.user = null;
  });
  console.log('User has logged out.')
}

module.exports = {
  checkUser,
  getSignup,
  postSignup,
  getLogin,
  postLogin,
  logout,
}
