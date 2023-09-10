module.exports = {
  // Make sure user has logged in
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/')
    }
  },
  // Make sure user is not logged in
  ensureGuest: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next()
    } else {
      res.redirect('/profile')
    }
  }
}