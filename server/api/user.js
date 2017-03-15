const User = require('../models/user')

const get_all = () => {
  return new Promise((resolve, reject) => {
    User.find((err, users) => {
      if (err) reject(err)
      resolve(users)
    })
  })
}

const post = (fbid, vanity, name, short_name, profile_pic_src, cover_photo_src) => {
  return new Promise((resolve, reject) => {
    let user = new User()
    user.fbid = fbid
    user.vanity = vanity
    user.name = name
    user.short_name = short_name
    user.profile_pic_src = profile_pic_src
    user.cover_photo_src = cover_photo_src
    user.save(err => {
      if (err) reject(err)
      resolve({ message: 'User stored in FbHack DB' })
    })
  })
}

const get = (user_id) => {
  return new Promise((resolve, reject) => {
    User.findOne({fbid: user_id}, (err, user) => {
      if (err) reject(err)
      resolve(user)
    })
  })
}

const put = (user_id, vanity, name, short_name, profile_pic_src, cover_photo_src) => {
  return new Promise((resolve, reject) => {
    User.findOne({fbid: user_id}, (err, user) => {
      if (err) reject(err)
      if (vanity) user.vanity = vanity
      if (name) user.name = name
      if (short_name) user.short_name = short_name
      if (profile_pic_src) user.profile_pic_src = profile_pic_src
      if (cover_photo_src) user.cover_photo_src = cover_photo_src
      user.save(err => {
        if (err) reject(err)
        resolve({ message: 'User updated in FbHack DB' })
      })
    })
  })
}

const _delete_ = (user_id) => {
  return new Promise((resolve, reject) => {
    User.remove({
      fbid: user_id
    }, (err, user) => {
      if (err) reject(err)
      resolve({ message: 'User deleted in FbHack DB' })
    })
  })
}

module.exports = {
  get_all,
  post,
  get,
  put,
  delete: _delete_
}
