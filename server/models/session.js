const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const SessionSchema = new mongoose.Schema({
  user_id: Number,
  lsd: String,
  dtsg: String,
  jar: {}
})

module.exports = mongoose.model('Session', SessionSchema)
