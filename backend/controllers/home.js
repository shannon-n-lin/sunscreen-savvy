const Sunscreen = require('../models/Sunscreen')
const Brand = require('../models/Brand')

const getIndex = async (req, res) => {
  try {
    // Find all sunscreens in database
    const sunscreens = await Sunscreen.find({})
    res.render('index.ejs', { 
      user: req.user, 
      sunscreens: sunscreens,
      brands: Brand,
    })
  }
  catch (err) {
    console.log(err)
  }
}

module.exports = { getIndex }
