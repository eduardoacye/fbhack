var request = require('request').defaults({
  followRedirects: true,
  followAllRedirects: true
});

var querystring = require('querystring');

/* PARAMETERS*/

const urlHome = 'https://www.facebook.com/';

const urlLogin = urlHome + 'login.php';

const urlUser = username => urlHome + username;

const reLSD =
  RegExp('input type="hidden" name="lsd" value="(.*?)" autocomplete="off"');

const reDTSG =
  RegExp('input type="hidden" name="fb_dtsg" value="(.*?)" autocomplete="off"');

const reID =
  RegExp('input type="hidden" autocomplete="off" name="xhpc_targetid" value="(.*?)"');

const reFullname =
  RegExp('a class="fbxWelcomeBoxName" (.*?) data-testid="fb_welcome_box">(.*?)</a>');

const reShortname =
  RegExp('profile_pic_header(.*?)>(.*?)<span>(.*?)</span>');

const reProfilePic =
  RegExp('img class="profilePic img" alt="(.*?)" src="(.*?)"');

const reCoverPic =
  RegExp('img class="coverPhotoImg photo img" src="(.*?)"');

const hdrsGet = {
  'Host': 'www.facebook.com',
  'Origin': 'http://www.facebook.com',
  'Referer': 'http://www.facebook.com/',
  'User-Agent': '"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"'
};

const hdrsPost = (data) => {
  return {
    'Content-Length': data.length,
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': '"user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.87 Safari/537.36"'
  };
}

const dataPost = (username, password, lsd) =>
  querystring.stringify({
    'email': username,
    'pass': password,
    'locale': 'en_US',
    'non_com_login': '',
    'lsd': lsd
  });


const limitThreadlist = 20;

const urlThreadlist = (offset, id, dtsg, limit = limitThreadlist) =>
  (urlHome + 'ajax/mercury/threadlist_info.php?' +
   '&client=web_messenger' +
   `&inbox[offset]=${offset}` +
   `&inbox[limit]=${limit}` +
   '&inbox[filter]'+
   `&__user=${id}` +
   '&__af=i0' +
   '&__be=-1' +
   '&__a=1' +
   '&__pc=PHASED%3ADEFAULT' +
   `&fb_dtsg=${dtsg}`);


/* PROCEDURES */
const loginGET =
  (session, proceed) =>
    request({
      url: urlLogin,
      jar: session,
      headers: hdrsGet
    }, (err, res, body) => {
      if (err) {
        throw new Error('Login page GET failed at obtaining a valid response');
      } else {
        proceed(res, body);
      }
    });

const loginPOST =
  (username, password, session, lsd, proceed) => {
    let data = dataPost(username, password, lsd);
    request.post({
      url: urlLogin,
      jar: session,
      headers: hdrsPost(data),
      body: data
    }, (err, res, body) => {
      if (err) {
        throw new Error('Login page POST failed at obtaining a valid response');
      } else {
        proceed(res, body);
      }
    })
  };


const homeGET =
  (username, session, proceed) =>
    request({
      url: urlUser(username),
      jar: session,
      headers: hdrsGet
    }, (err, res, body) => {
      if (err) {
        throw new Error('User home page GET failed at obtaining a valid response');
      } else {
        proceed(res, body);
      }
    });

const extractRE =
  (name, re, group) => (body) => {
    let match = re.exec(body);
    if (!match) {
      throw new Error(`Failed to extract ${name} from the response body`);
    } else {
      return match[group];
    }
  };

/* Must be extracted from the login page before login */
const extractLSD =
  extractRE('lsd', reLSD, 1);

/* Must be extracted from the main page after login */
const extractDTSG =
  extractRE('dtsg', reDTSG, 1);

const extractID =
  extractRE('id', reID, 1);

const extractFullname =
  extractRE('full name', reFullname, 2);

const extractShortname =
  extractRE('short name', reShortname, 3);

/* Must be extracted from user home page after login */
const extractProfilePic =
  extractRE('profile picture', reProfilePic, 2);

const extractCoverPic =
  extractRE('cover picture', reCoverPic, 1);

const login = exports.login =
  (username, password, proceed) => {
    let session = request.jar();
    loginGET(
      session,
      (res, body) => {
        try {
          var lsd = extractLSD(body);
        } catch (err) {
          proceed({ loggedIn: false });
          return;
        }
        loginPOST(
          username, password, session, lsd,
          (res, body) => {
            try {
              var fbid = extractID(body);
              var fullname = extractFullname(body);
              var shortname = extractShortname(body);
              var fbdtsg = extractDTSG(body);
            } catch (err) {
              proceed({ loggedIn: false });
              return;
            }
            homeGET(
              username, session,
              (res, body) => {
                try {
                  var profilepic = extractProfilePic(body).replace('&amp;', '&');
                  var coverpic = extractCoverPic(body).replace('&amp;', '&');
                } catch (err) {
                  proceed({ loggedIn: false });
                  return;
                }
                proceed({
                  loggedIn: true,
                  user: {
                    fbid: fbid,
                    username: username,
                    fullname: fullname,
                    shortname: shortname,
                    profilepic: profilepic,
                    coverpic: coverpic,
                    session: session,
                    fbdtsg: fbdtsg
                  }
                });
              });
          });
      });
  };
