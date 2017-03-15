const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const UserStatSchema = new mongoose.Schema({
  user_fbid: Number,
  type: String,
  data: {},
  timestamp: Number
})

module.exports = mongoose.model('UserStat', UserStatSchema)
