const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const ThreadStatSchema = new mongoose.Schema({
  user_fbid: Number,
  thread_fbid: Number,
  participants: [String]
  type: String,
  data: {},
  timestamp: Number
})

module.exports = mongoose.model('ThreadStat', ThreadStatSchema)
