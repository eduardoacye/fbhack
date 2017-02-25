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


var currentUser = {};

var fbh = require('./hack/fbh');
apiRouter.get('/login/', (req, res) => {
  fbh.login(req.query.username,
            req.query.password,
            result => {
              currentUser = result.user;
              res.json(result);
            });
});

apiRouter.get('/logout/', (req, res) => {
  currentUser={};
  res.json(currentUser);
});

apiRouter.get('/threadlist/', (req, res) => {
  fbh.threadlist(currentUser,
                 req.query.page,
                 result => res.json(result));
});

module.exports = apiRouter;
