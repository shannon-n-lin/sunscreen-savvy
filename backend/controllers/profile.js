const Profile = require('../models/Profile')
const SkinType = require('../models/SkinType')
const SkinTone = require('../models/SkinTone')
const SkinConcern = require('../models/SkinConcern')

const getProfile = async (req, res) => {
  try {
    // Find profile in database with current user's id
    const profile = await Profile.findOne({ userId: req.user.id })
    // Find all skin types, tones, and concerns in database
    const skinTypes = await SkinType.find({})
    const skinTones = await SkinTone.find({})
    const skinConcerns = await SkinConcern.find({})

    res.render('profile.ejs', { 
      user: req.user, 
      profile: profile, 
      skinTypes: skinTypes,
      skinTones: skinTones,
      skinConcerns: skinConcerns,
    })
  }
  catch (err) {
    console.log(err)
  }
}

const updateProfile = async (req, res) => {
  try {
    // Find profile in database with current user's id
    await Profile.findOneAndUpdate(
      { userId: req.user.id },
      { // Update fields with form data
        skinType: req.body.skinType,
        skinTone: req.body.skinTone,
        $set: { skinConcerns: req.body.skinConcerns }
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