const Profile = require('../models/Profile')

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id })
    console.log(profile)
    res.render('profile.ejs', { user: req.user, profile: profile })
  }
  catch (err) {
    console.log(err)
  }
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
  updateProfile,
}