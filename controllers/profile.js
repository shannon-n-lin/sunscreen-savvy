const Profile = require('../models/Profile')
const SkinType = require('../models/SkinType')
const SkinTone = require('../models/SkinTone')

const getProfile = async (req, res) => {
  try {
    // Find profile in database with current user's id
    const profile = await Profile.findOne({ userId: req.user.id })
    // Find all skin types in database
    const skinTypes = await SkinType.find({})
    // Find all skin tones in database
    const skinTones = await SkinTone.find({})
    res.render('profile.ejs', { 
      user: req.user, 
      profile: profile, 
      skinTypes: skinTypes,
      skinTones: skinTones,
    })
  }
  catch (err) {
    console.log(err)
  }
}

const updateProfile = async (req, res) => {
  try {
    // Find profile in database with current user's id
    // Update fields with user input
    await Profile.findOneAndUpdate(
      { userId: req.user.id },
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

const getSkinType = (req, res) => {
  res.render('skintype.ejs')
}

const postSkinType = async (req, res) => {
  try {
    // Save a new skin type
    const skintype = new SkinType({
      skinType: req.body.skintype,
    })
    await skintype.save()
    console.log('Skin type added')
    res.redirect('skintype')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getProfile,
  updateProfile,
  getSkinType,
  postSkinType,
}