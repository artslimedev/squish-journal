const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: false,
  },
  entry: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: Date.now,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Entry', EntrySchema)
