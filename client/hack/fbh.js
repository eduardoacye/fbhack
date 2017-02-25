var request = require('request');

const login = (username, password, proceed) =>
  request({
    url: `http://localhost:9000/api/login/?username=${username}&password=${password}`
  }, (err, res, body) => proceed(JSON.parse(body)));

const logout = proceed =>
  request({
    url: 'http://localhost:9000/api/logout/'
  }, (err, res, body) => proceed());

export { login, logout };
