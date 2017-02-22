var request = require('request');

const fbhAttemptLogin = (username, password, callback) => {
  request({
    url: `http://localhost:9000/api/login/?username=${username}&password=${password}`
  }, (err, res, body) => callback(JSON.parse(body)))
};

export default fbhAttemptLogin;
