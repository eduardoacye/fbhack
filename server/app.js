var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');
var apiRouter = require('./api-router');

/* Database setup */
mongoose.connect('mongodb://127.0.0.1:27017/fbhack');

/* Server setup */
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '..', 'build')));
app.use('/api', apiRouter);
app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html')));

module.exports = app;
