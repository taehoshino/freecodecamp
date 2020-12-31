const mongoose = require('mongoose')
const Exercise = require('./exercise')

const userSchema = new mongoose.Schema({
  username: {type: String, required: true},
  _id: {type: mongoose.Types.ObjectId, auto: true},
  versionKey: false
})

userSchema.virtual('exercises', {
  ref: 'Exercise',
  localField: '_id',
  foreignField: 'userId'
})

const User = mongoose.model('User', userSchema)

module.exports = User