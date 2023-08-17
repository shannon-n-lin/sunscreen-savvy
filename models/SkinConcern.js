const mongoose = require('mongoose')

const SkinConcernSchema = new mongoose.Schema({
  skinConcern: {
    type: String,
  },
})

module.exports = mongoose.model('SkinConcern', SkinConcernSchema)
