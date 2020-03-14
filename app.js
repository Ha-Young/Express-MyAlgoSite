require('dotenv').config();
const express = require('express');
const app = express();
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const login = require('./routes/login');
const problem = require('./routes/problem');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SECRET_CODE,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: false
}));

require('./config/mongoose');
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', login);
app.use('/problem', problem);
app.post('/logout', function(req, res, next) {
  req.session.destroy(() => {
    req.session;
  });
  res.redirect('/login');
});

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { error: err.displayMessage });
});

module.exports = app;
