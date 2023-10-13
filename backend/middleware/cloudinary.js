const cloudinary = require('cloudinary').v2

require('dotenv').config({ path: './config/.env' })

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  // cloud_name: 'dwo3u3n4h',
  api_key: process.env.API_KEY,
  // api_key: '138887763431652',
  api_secret: process.env.API_SECRET,
  // api_secret: 'rqRVyHxg37a1FKHjaE00eSjbNkI',
})

module.exports = cloudinary
