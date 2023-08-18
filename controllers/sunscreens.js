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
    // Check if brand exists in database
    let brand = await Brand.findOne({ name: req.body.brand })
    // If brand does not already exist, create a new brand
    if (!brand) {
      await Brand.create({
        name: req.body.brand,
      })
      console.log(`Brand '${req.body.brand}' added`)
      // Reassign brand variable now that it exists in database
      brand = await Brand.findOne({ name: req.body.brand })
    }
    
    // Create new sunscreen in database
    await Sunscreen.create({
      name: req.body.name,
      brand: brand._id,
      spf: req.body.spf,
      type: req.body.type,
      form: req.body.form,
      finish: req.body.finish,
      waterResistant: req.body.waterResistant,
      broadSpectrum: req.body.broadSpectrum,
      pricePerOz: req.body.pricePerOz,
      ingredients: req.body.ingredients,
    })
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