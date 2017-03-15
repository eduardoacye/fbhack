const querystring = require('querystring')

const urls = {
  home: 'https://www.facebook.com/',
  login: 'https://www.facebook.com/login.php'
}

const headers = {
  GET: {
    'Host': 'www.facebook.com',
    'Origin': 'http://www.facebook.com',
    'Referer': 'http://www.facebook.com/',
    'User-Agent': '"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"'
  },
  POST: (body) => {
    return {
      'Content-Length': body.length,
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': '"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"'
    }
  }
}

const regexes = {
  lsd: RegExp('input type="hidden" name="lsd" value="(.*?)" autocomplete="off"'),
  dtsg: RegExp('input type="hidden" name="fb_dtsg" value="(.*?)" autocomplete="off"'),
  fbid: RegExp('input type="hidden" autocomplete="off" name="xhpc_targetid" value="(.*?)"'),
  name: RegExp('a class="fbxWelcomeBoxName" (.*?) data-testid="fb_welcome_box">(.*?)</a>'),
  short_name: RegExp('profile_pic_header(.*?)>(.*?)<span>(.*?)</span>'),
  profile_pic_src: RegExp('img class="profilePic img" alt="(.*?)" src="(.*?)"'),
  cover_photo_src: RegExp('img class="coverPhotoImg photo img" src="(.*?)"')
}

const makeRextractor = (name, re, group) => body => {
  let match = re.exec(body)
  if (!match)
    return new Error(`Failed to extract ${name}`)
  return match[group]
}

const rextractors = {
  lsd: makeRextractor('lsd', regexes.lsd, 1),
  dtsg: makeRextractor('dtsg', regexes.dtsg, 1),
  fbid: makeRextractor('fbid', regexes.fbid, 1),
  name: makeRextractor('name', regexes.name, 2),
  short_name: makeRextractor('short name', regexes.short_name, 3),
  profile_pic_src: makeRextractor('profile picture', regexes.profile_pic_src, 2),
  cover_photo_src: makeRextractor('cover photo', regexes.cover_photo_src, 1)
}

const data = {
  POST: (username, password, lsd) =>
    querystring.stringify({
      'email': username,
      'pass': password,
      'locale': 'en_US',
      'non_com_login': '',
      'lsd': lsd
    })
}

exports.urls = urls
exports.headers = headers
exports.rextractors = rextractors
exports.data = data
