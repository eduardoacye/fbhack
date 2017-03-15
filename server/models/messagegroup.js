const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const MessageGroupSchema = new mongoose.Schema({
  name: String,
  description: String,
  timestamp: Number,
  messages: [ObjectId]
})

module.exports = mongoose.model('MessageGroup', MessageGroupSchema)
