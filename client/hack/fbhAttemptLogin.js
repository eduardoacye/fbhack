var request = require('request').defaults({
  followRedirect: true,
  followAllRedirects: true
});

var querystring = require('querystring');

var jsdom = require('jsdom');

const urlFbLogin = 'https://www.facebook.com/login.php';

const reFbDTSG =  RegExp('input type="hidden" name="fb_dtsg" value="(.*?)" autocomplete="off"');

const fbhAttemptLogin = (username, password) => {
  /* Try to log in, if successful return:
     - loggedIn (true or false)
     ::: OPTIONAL :::
     - fbid (string denoting the id assigned by facebook to the user)
     - username (provided by the user)
     - fullname ()
     - shortname ()
     - picture (url)
     - session (a request jar)
     - fbdtsg (code generated after login)

     FIX!!! This code must be executed on the server
   */
  let result = {};
  let session = request.jar();
  request({
    url: urlFbLogin,
    jar: session
  }, (err, res, body) => {
    if (err) { console.log(err); return 'failure'; }
    jsdom.env({
      html: body,
      cookieJar: session._jar,
      done: (err, window) => {
        if (err) { console.log(err); return 'failure'; }
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
          if (err) { console.log(err); return 'failure'; }
          const dtsg = reFbDTSG.exec(body)[1];
          console.log('Successful log in!');
          result.username = username;
          result.session = session;
          result.dtsg = dtsg;
          result.loggedIn = true;
        });
      }
    });
  });
  return result;
};

export default fbhAttemptLogin;
