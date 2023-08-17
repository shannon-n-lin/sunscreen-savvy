const mongoose = require('mongoose')
const SkinType = require('./SkinType')

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  skinType: { 
    type: String, 
  },
  skinTone: {
    type: String,
  },
})

module.exports = mongoose.model('Profile', ProfileSchema)