const express = require('express')
const app = express()
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('express-flash')
const logger = require('morgan')
const connectDB = require('./config/database')
const mainRoutes = require('./routes/main')

// Use environment variables from .env in config folder
require('dotenv').config({ path: './config/.env' })

// Passport config
require('./config/passport')(passport)

// Connect to database using database.js in config folder
connectDB()

// Express middleware
app.set('view-engine', 'ejs') 
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logging
app.use(logger('dev'))

// Sessions to keep users logged in
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_STRING })
  })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Flash messages
app.use(flash())

// Routes
app.use('/', mainRoutes)

// Use PORT from .env
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}.`)
})