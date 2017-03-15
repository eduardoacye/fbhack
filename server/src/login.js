const rp = require('request-promise').defaults({
  followRedirects: true,
  followAllRedirects: true
})

const fb = require('./parameters')

const login = (username, password) => {
  return new Promise((resolve, reject) => {
    let jar = rp.jar()
    rp({
      uri: fb.urls.login,
      jar: jar,
      headers: fb.headers.GET
    }).then(html => {
      let lsd = fb.rextractors.lsd(html)
      if (lsd instanceof Error)
        reject(lsd)
      let body = fb.data.POST(username, password, lsd)
      rp.post({
        uri: fb.urls.login,
        jar: jar,
        headers: fb.headers.POST(body),
        body: body,
        followRedirects: true,
        followAllRedirects: true
      }).then(html => {
        let fbid = fb.rextractors.fbid(html)
        let dtsg = fb.rextractors.dtsg(html)
        if (fbid instanceof Error)
          reject(fbid)
        if (dtsg instanceof Error)
          reject(dtsg)
        resolve({
          fbid: fbid, vanity: username, // user information
          lsd: lsd, dtsg: dtsg, jar: jar // user session
        })
      }).catch(err => {
        reject(err)
      })
    }).catch(err => {
      reject(Error(err))
    })
  })
}

module.exports = login
