const express = require('express')
const app = express()
const logger = require('morgan')
const mainRoutes = require('./routes/main')

// Use environment variables from .env in config folder
require('dotenv').config({ path: './config/.env' })

// Express middleware
app.set('view-engine', 'ejs') 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logging
app.use(logger('dev'))

// Routes
app.use('/', mainRoutes)

// Use PORT from .env
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`)
})