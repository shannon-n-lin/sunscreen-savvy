const Profile = require('../models/Profile')
const SkinType = require('../models/SkinType')

const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.user.id })
    const skinTypes = await SkinType.find({})
    res.render('profile.ejs', { user: req.user, profile: profile, skinTypes: skinTypes})
  }
  catch (err) {
    console.log(err)
  }
}

const updateProfile = async (req, res) => {
  try {
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