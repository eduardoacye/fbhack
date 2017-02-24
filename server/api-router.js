var express = require('express');

var apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  console.log('fbhack API called');
  next();
});

apiRouter.get('/', (req, res) =>
  res.json({
    message: 'welcome to the fbhack API'
  }));


var fbh = require('./hack/fbh');
apiRouter.get('/login/', (req, res) => {
  fbh.login(req.query.username,
            req.query.password,
            result => res.json(result));
});

module.exports = apiRouter;
