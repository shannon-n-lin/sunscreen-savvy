const mongoose = require('mongoose')

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
  skinConcerns: {
    type: Array,
  }
})

module.exports = mongoose.model('Profile', ProfileSchema)
