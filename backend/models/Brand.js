const mongoose = require('mongoose')

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  }
})

module.exports = mongoose.model('Brand', BrandSchema)