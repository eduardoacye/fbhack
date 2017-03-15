const rp = require('request-promise').defaults({
  followRedirects: true,
  followAllRedirects: true
})

const fb = require('./parameters')

const user_info = (fbid, {lsd, dtsg, jar}) => {
  return new Promise((resolve, reject) => {
    // TODO
    reject(new Error('shit son, implement this mofo'))
  })
}

export default user_info
