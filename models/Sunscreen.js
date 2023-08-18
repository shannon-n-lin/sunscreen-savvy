const mongoose = require('mongoose')

const SunscreenSchema = new mongoose.Schema({
  name: { 
    type: String, 
  },
  brand: {
    type: String,
  },
  spf: {
    type: Number,
  },
  type: {
    type: String,
    enums: ['lotion', 'gel', 'spray', 'stick']
  },
  form: {
    type: String,
  },
  finish: {
    type: String,
  },
  waterResistant: {
    type: Boolean,
    default: false,
  },
  broadSpectrum: {
    type: Boolean,
    default: false,
  },
  pricePerOz: {
    type: mongoose.Schema.Types.Decimal128,
  },
  ingredients: {
    type: String,
  },
})

module.exports = mongoose.model('Sunscreen', SunscreenSchema)