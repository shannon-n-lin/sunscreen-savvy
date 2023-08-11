const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const User = require('../models/User')

module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
      User.findOne({ email: email.toLowerCase() }, (err, user) => {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false, { msg: `Email ${email} not found`})
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err)
          }
          if (isMatch) {
            return done(null, user)
          }
          return done(null, false, { msg: 'Invalid email or password'})
        })
      })
    })
  )

  passport.use(
    new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
      async function findUser() {
        try {
          let data = await User.findOne({ email: email } )
          if (!data) {
            console.log(`Email ${email} not found`)
            return done(null, false, { msg: `Email ${email} not found` })
          }
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              return done(err)
            }
            if (isMatch) {
              return done(null, user)
            }
            return done(null, false, { msg: 'Invalid email or password'})
          })
        } catch (err) {
          console.log(err)
        }
      }
    })
  )

  passport.use(
     new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
      User.findOne({ email: email }).then(user => {
        if (!user) {
          console.log(`Email ${email} not found`)
          return done(null, false, { msg: `Email ${email} not found` })
        }
        user.comparePassword(password, (err, isMatch) => {
          if (err) {
            return done(err)
          }
          if (isMatch) {
            return done(null, user)
          }
          return done(null, false, { msg: 'Invalid email or password'})
        })
      })
     })
  )



  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  
  // passport.deserializeUser((id, done) => {
  //   // User.findById(id, (err, user) => done(err, user))
  //   User.findById(id).then((err, user) => {

  //       done(err, user)

  //   })
  // })
  passport.deserializeUser((id, done)=>{

    User.findById(id).then((user) => {
      done(null, user);
    }).catch(done);

});

}