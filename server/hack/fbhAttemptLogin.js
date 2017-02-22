var request = require('request').defaults({
  followRedirect: true,
  followAllRedirects: true
});

var querystring = require('querystring');

var jsdom = require('jsdom');

const urlFbHome = 'https://www.facebook.com/';
const urlFbLogin = 'https://www.facebook.com/login.php';

const reFbDTSG = RegExp('input type="hidden" name="fb_dtsg" value="(.*?)" autocomplete="off"');
const reFbID = RegExp('input type="hidden" autocomplete="off" name="xhpc_targetid" value="(.*?)"');

const headersFb = {
  'Host': 'www.facebook.com',
  'Origin': 'http://www.facebook.com',
  'Referer': 'http://www.facebook.com/',
  'User-Agent': '"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"'
};

const threadsLimit = 20;

const urlFbThreadlist = (offset, id, dtsg) =>
  (urlFbHome + 'ajax/mercury/threadlist_info.php?' +
   '&client=web_messenger' +
   `&inbox[offset]=${offset}` +
   `&inbox[limit]=${threadsLimit}` +
   '&inbox[filter]'+
   `&__user=${id}` +
   '&__af=i0' +
   '&__be=-1' +
   '&__a=1' +
   '&__pc=PHASED%3ADEFAULT' +
   `&fb_dtsg=${dtsg}`)

const fbhAttemptLogin = (username, password, callback) => {
  let result = {};
  let session = request.jar();
  request({
    url: urlFbLogin,
    jar: session
  }, (err, res, body) => {
    if (err) {
      console.log(err);
      result.loggedIn = false;
      callback(result);
      return 'failure';
    }
    jsdom.env({
      html: body,
      cookieJar: session._jar,
      done: (err, window) => {
        if (err) {
          console.log(err);
          result.loggedIn = false;
          callback(result);
          return 'failure';
        }
        const lsd = window.document.getElementsByTagName('input')['lsd'].value;
        const formData = querystring.stringify({
          'email': username,
          'pass': password,
          'locale': 'en_US',
          'non_com_login': '',
          'lsd': lsd
        });
        request.post({
          url: urlFbLogin,
          jar: session,
          headers: {
            'Content-Length': formData.length,
            'Content-Type': 'application/x-www-form-urlencoded',
            'User-Agent': '"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"'
          },
          body: formData
        }, (err, res, body) => {
          if (err) {
            console.log(err);
            result.loggedIn = false;
            callback(result);
            return 'failure';
          }
          let dtsg = '';
          let id = '';
          try {
            dtsg = reFbDTSG.exec(body)[1];
            id = reFbID.exec(body)[1];
          } catch (err) {
            console.log('Couldn´t log in');
            result.loggedIn = false,
            callback(result);
            return 'failure';
          }
          result.user = {};
          result.user.username = username;
          result.user.session = session;
          result.user.fbdtsg = dtsg;
          result.user.fbid = id;
          result.loggedIn = true;
          request({
            url: urlFbThreadlist(0, id, dtsg),
            jar: session,
            headers: headersFb
          }, (err, res, body) => {
            if (err) {
              console.log(err);
              result.loggedIn = false;
              callback(result);
              return 'failure';
            }
            let rawThreadsInfo = JSON.parse(body.substr(9, body.length));
            let participants = rawThreadsInfo.payload.participants
            if (participants) {
              let meData = participants.find(p => p.vanity == username);
              if (meData) {
                result.user.fullname = meData.name;
                result.user.shortname = meData.short_name;
                result.user.picture = meData.big_image_src;
                console.log('Successful login!');
                callback(result);
              } else {
                console.log('Couldn´t find user as participant in chats');
                result.loggedIn = false;
                callback(result);
                return 'failure';
              }
            } else {
              console.log('No chats available');
              result.loggedIn = false;
              callback(result);
              return 'failure';
            }
          });
        });
      }
    });
  });
};

module.exports = fbhAttemptLogin;
