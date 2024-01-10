const passport = require('passport')
const validator = require('validator')
const User = require('../models/User')
const Profile = require('../models/Profile')


// ---------------------------------------------------------
// SIGN UP

const postSignup = (req, res) => {
  const validationErrors = []
  if (!validator.isEmail(req.body.email)) {
    res.send({ 
      msgType: 'email',
      msg: 'Enter a valid email address, e.g. name@email.com.' 
    })
  }
  if (!validator.isLength(req.body.password, { min: 8 })) {
    res.send({
      msgType: 'password',
      msg: 'Enter a password with at least 8 characters.' 
    })
  }
  if (req.body.password !== req.body.confirmPassword) {
    res.send({ 
      msgType: 'confirm',
      msg: 'Passwords do not match.' 
    })
  }

  // If there are any errors, send messages
  if (validationErrors.length) {
    console.log(validationErrors)
    return validationErrors   // for React frontend
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
      // If username or email address already exists, send error message
      let data = await User.findOne({ $or: [{ email: req.body.email }, { username: req.body.username}] })
      if (data) {
        res.send({ msg: 'Another user with this email address or username already exists.' })
      } 
      // Otherwise, save new user to database
      await user.save()
      res.send({user})

      // // Then log in new user and redirect to profile page
      // await req.logIn(user, (err) => {
      //   if (err) {
      //     return next(err)
      //   }
      //   console.log(`${req.body.email} account created`)
      //   req.flash('success', { msg: 'Welcome!' })
      //   res.redirect('/profile')
      // })

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


// ---------------------------------------------------------
// LOG IN

const postLogin = (req, res, next) => {
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


// ---------------------------------------------------------
// LOG OUT

const logout = (req, res, next) => {
  req.logout(req.user, (err)=> {
    if (err) return next(err);
  })
  res.clearCookie('connect.sid');
  res.send({isAuth: req.isAuthenticated(), user: req.user})
}


// ---------------------------------------------------------
// CHECK USER (FRONTEND)

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


// ---------------------------------------------------------
// GET SIGN UP PAGE (BACKEND)

const getSignup = (req, res) => {
  res.render('signup.ejs')
}


// ---------------------------------------------------------
// GET LOGIN (BACKEND)

const getLogin = (req, res) => {
  res.render('login.ejs')
}


module.exports = {
  postSignup,
  postLogin,
  logout,
  checkUser,
  getSignup,
  getLogin,
}
