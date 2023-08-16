const User = require('../models/User')

const getProfile = (req, res) => {
  res.render('profile.ejs', { user: req.user })
}

const updateProfile = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.params.id },
      {
        skinType: req.body.skinType,
        skinTone: req.body.skinTone,
      }
    )
    console.log('Profile updated')
    res.redirect('profile')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getProfile,
  updateProfile
}