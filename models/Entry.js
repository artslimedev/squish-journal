const mongoose = require('mongoose')

const EntrySchema = new mongoose.Schema({
  entry: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: false,
  },
  date: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Entry', EntrySchema)
