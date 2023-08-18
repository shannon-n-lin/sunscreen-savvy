const mongoose = require('mongoose')

const SunscreenSchema = new mongoose.Schema({
  name: { 
    type: String, 
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand',
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
  },
  broadSpectrum: {
    type: Boolean,
  },
  pricePerOz: {
    type: mongoose.Schema.Types.Decimal128,
  },
  ingredients: {
    type: Array,
  },
})

module.exports = mongoose.model('Sunscreen', SunscreenSchema)