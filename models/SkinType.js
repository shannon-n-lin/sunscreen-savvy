const mongoose = require('mongoose')

const SkinTypeSchema = new mongoose.Schema({
  skinType: {
    type: String,
  },
})

module.exports = mongoose.model('SkinType', SkinTypeSchema)
