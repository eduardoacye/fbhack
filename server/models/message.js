const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const MessageSchema = new mongoose.Schema({
  user_fbid: Number,
  thread_fbid: Number,
  timestamp: Number,
  attachments: {},
  author_fbid: Number,
  body: String
})

module.exports = mongoose.model('Message', MessageSchema)
