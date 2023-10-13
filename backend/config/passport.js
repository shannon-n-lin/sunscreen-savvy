const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
      User.findOne({ email: email }).then(user => {
        // Check if account with email address exists in database
        if (!user) {
          console.log(`Email ${email} not found`)
          return done(null, false, { msg: `We could not find an account with that email address. Please try again.` })
        }
        // If so, check if submitted password is correct
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err)
          }
          if (isMatch) {
            return done(null, user)
          }
          return done(null, false, { msg: 'The password you entered does not match our records. Please try again.'})
        })
      })
     })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user)
    }).catch(done)
  })
}
