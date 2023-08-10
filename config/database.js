const mongoose = require('mongoose')

// Use Mongoose to connect to MongoDB with DB_STRING from .env in config folder
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

module.exports = connectDB