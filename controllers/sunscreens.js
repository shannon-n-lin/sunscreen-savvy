const Sunscreen = require('../models/Sunscreen')
const Brand = require('../models/Brand')

const getAddSunscreen = async (req, res) => {
  try {
    res.render('add-sunscreen.ejs', {

    })
  }
  catch (err) {
    console.log(err)
  }
}

const postAddSunscreen = async (req, res) => {
  try {
    let brand = await Brand.findOne({ brand: req.user.brand })
    if (!brand) {
      brand = new Brand({
        brand: req.user.brand,
      })
      await brand.save()
    }
    let ingredients = req.body.ingredients.split(', ')
    console.log(typeof ingredients)
    await Sunscreen.create(
      {
        name: req.body.name,
        brand: brand._id,
        spf: req.body.spf,
        type: req.body.type,
        form: req.body.form,
        finish: req.body.finish,
        waterResistant: req.body.waterResistant,
        broadSpectrum: req.body.broadSpectrum,
        pricePerOz: req.body.pricePerOz,
        $set: { ingredients: ingredients }
      }
    )
    console.log('Sunscreen added')
    res.redirect('add-sunscreen')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getAddSunscreen,
  postAddSunscreen,
}