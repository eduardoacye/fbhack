const rp = require('request-promise')
const tough = require('tough-cookie')

const Session = require('../models/session')

const serializeJar = (jar) => jar._jar.serializeSync()

const deserializeJar = (obj) => {
  let jar = rp.jar()
  jar._jar = tough.CookieJar.deserializeSync(obj)
  jar._jar.enableLooseMode = true
  return jar
}

const get = (user_id) => {
  return new Promise((resolve, reject) => {
    Session.findOne({user_id}, (err, session) => {
      if (err) reject(err)
      session.jar = deserializeJar(session.jar)
      resolve(session)
    })
  })
}

const post = (user_id, lsd, dtsg, jar) => {
  return new Promise((resolve, reject) => {
    let session = new Session()
    session.user_id = user_id
    session.lsd = lsd
    session.dtsg = dtsg
    session.jar = serializeJar(jar)
    session.save(err => {
      if (err) reject(err)
      resolve({ message: 'Session stored in FbHack DB' })
    })
  })
}

const _delete_ = (user_id) => {
  return new Promise((resolve, reject) => {
    Session.remove({
      user_id
    }, (err, session) => {
      if (err) reject(err)
      resolve({ message: 'Session deleted in FbHack DB' })
    })
  })
}

module.exports = {
  get,
  post,
  delete: _delete_
}
