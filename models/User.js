const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
})

// Password hash middleware
UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) return next()
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
  } catch (err) {
    next(err)
  }
})

// Helper method for validating user's password
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password)
  } catch (err) {
    throw err
  }
}

module.exports = mongoose.model('User', UserSchema)
