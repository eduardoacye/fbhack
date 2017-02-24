var request = require('request');

const login = (username, password, proceed) =>
  request({
    url: `http://localhost:9000/api/login/?username=${username}&password=${password}`
  }, (err, res, body) => proceed(JSON.parse(body)));

export { login };
