const Sunscreen = require('../models/Sunscreen')
const Brand = require('../models/Brand')
const cloudinary = require('../middleware/cloudinary')

const getAddSunscreen = async (req, res) => {
  try {
    res.render('addSunscreen.ejs', {

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

    // Upload image to Cloudinary
    // const result = await cloudinary.uploader.upload(req.image.path)
    const result = await cloudinary.uploader.upload(req.file.path);

    // Create new sunscreen in database
    await Sunscreen.create({
      name: req.body.name,
      brand: brand.name,
      spf: req.body.spf,
      type: req.body.type,
      form: req.body.form,
      finish: req.body.finish,
      waterResistant: req.body.waterResistant,
      broadSpectrum: req.body.broadSpectrum,
      pricePerOz: req.body.pricePerOz,
      // TODO: fix url field in mongodb schema
      url: req.body.url,
      ingredients: req.body.ingredients,
      image: result.secure_url,
      cloudinaryId: result.public_id,
    })
    console.log('Sunscreen added')
    console.log(`${req.body}`)
    res.redirect('addSunscreen')
  } catch (err) {
    console.log(err)
  }
}

const getSunscreen = async (req, res) => {
  try {
    const sunscreen = await Sunscreen.findById(req.params.id)
    res.render('sunscreen.ejs', { sunscreen: sunscreen })
  } catch (err) {
    console.log(err)
  }
}

const getAllSunscreens = async (req, res) => {
  try {
    const { type, form, spf, price } = req.query
    let filters = {}
    if (type) {
      const typeValues = type.split(',')
      if (typeValues.length === 1) {
        filters.type = typeValues[0]
      } else {
        filters.type = {$in: typeValues}
      }
    }
    if (form) {
      const formValues = form.split(',')
      if (formValues.length === 1) {
        filters.form = formValues[0]
      } else {
        filters.form = {$in: formValues}
      }
    }
    if (spf) {
      filters.spf = {$gte: parseInt(spf)}
    }
    if (price) {
      const priceValues = price.split(',')
      filters.pricePerOz = { $gte: parseInt(priceValues[0]), $lte: parseInt(priceValues[1]) } 
    }
    console.log(filters)
    const sunscreens = await Sunscreen.find(filters)
    return res.json(sunscreens)
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  getAddSunscreen,
  postAddSunscreen,
  getSunscreen,
  getAllSunscreens,
}
