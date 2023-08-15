module.exports = {
  getIndex: (req, res) => {
    res.render('index.ejs', { user: req.user })
  },
  getProfile: (req, res) => {
    res.render('profile.ejs', { user: req.user })
  }
}