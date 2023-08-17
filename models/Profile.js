const mongoose = require('mongoose')
const SkinType = require('./SkinType')

const ProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  skinType: [{ 
    type: String, 
    enum: ['oily', 'dry', 'normal', 'combination', 'none selected'],
  }],
  skinTone: {
    type: String,
    enum: ['very light', 'light', 'medium-light', 'medium-deep', 'deep', 'very deep', 'none selected'],
  },
})

module.exports = mongoose.model('Profile', ProfileSchema)