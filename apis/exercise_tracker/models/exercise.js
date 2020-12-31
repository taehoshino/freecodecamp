const mongoose = require('mongoose')

const execiseSchema = new mongoose.Schema({
  userId: {type: mongoose.Types.ObjectId, required: true, ref: 'User'},
  description: {type: String, required: true},
  duration: {type: Number, required: true}, 
  date: {type: Date}
})
const Exercise = mongoose.model('Exercise', execiseSchema)

module.exports = Exercise