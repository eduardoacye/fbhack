const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const UserSchema = new mongoose.Schema({
  fbid: Number,
  vanity: String,
  name: String,
  short_name: String,
  profile_pic_src: String,
  cover_photo_src: String
})

module.exports = mongoose.model('User', UserSchema)
