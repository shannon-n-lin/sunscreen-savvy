const mongoose = require('mongoose')

const skinTypes = [
  'oily', 
  'dry', 
  'normal', 
  'combination', 
  'sensitive'
]

const skinTones = [
  'very light', 
  'light', 
  'medium-light', 
  'medium-deep', 
  'deep', 
  'very deep'
]

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  skinType: {
    type: String,
    enum: skinTypes,
    default: 'none selected',
  },
  skinTone: {
    type: String,
    enum: skinTones,
    default: 'none selected',
  },
})

ProfileSchema.methods.listSkinTypes = function() {
  return skinTypes
}

ProfileSchema.methods.listSkinTones= function() {
  return skinTones
}

module.exports = mongoose.model('Profile', ProfileSchema)