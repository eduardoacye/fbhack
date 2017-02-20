var express = require('express');

var apiRouter = express.Router();

apiRouter.use((req, res, next) => {
  console.log('fbhack API called');
  next();
});

apiRouter.get('/', (req, res) =>
  res.json({ message: 'welcome to the fbhack API' }));

module.exports = apiRouter;
