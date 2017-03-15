const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const ThreadSchema = new mongoose.Schema({
  user_fbid: Number,
  last_message_timestamp: Number,
  message_count: Number,
  name: String,
  participants: [Number],
  snippet: String,
  snippet_attachment: {},
  snippet_sender: Number,
  fbid: Number
})

module.exports = mongoose.model('Thread', ThreadSchema)
