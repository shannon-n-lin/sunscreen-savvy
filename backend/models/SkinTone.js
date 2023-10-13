const mongoose = require('mongoose')

const SkinToneSchema = new mongoose.Schema({
  skinTone: {
    type: String,
  }
})

module.exports = mongoose.model('SkinTone', SkinToneSchema)
