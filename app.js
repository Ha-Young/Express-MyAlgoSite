const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;
const CALLBACK_URL = process.env.CALLBACK_URL;
const MY_SECRET = process.env.MY_SECRET;

exports.GITHUB_CLIENT_ID = GITHUB_CLIENT_ID;
exports.GITHUB_CLIENT_SECRET = GITHUB_CLIENT_SECRET;
exports.CALLBACK_URL = CALLBACK_URL;

const index = require('./routes/index');
const auth = require('./routes/auth');
const problems = require('./routes/problems');

const app = express();

mongoose.connect('mongodb://localhost:27017/codewars', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to Mongo database..'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: MY_SECRET,
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/auth', auth);
app.use('/problems', problems);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
