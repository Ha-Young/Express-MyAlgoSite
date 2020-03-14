require('dotenv').config();
require('./config/passport');
require('./config/mongoose');

const express = require('express');
const session = require('express-session');

const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const login = require('./routes/login');
const problem = require('./routes/problem');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.urlencoded());
app.use(express.static(path.join(__dirname, '/public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 5 }
}));

app.use(passport.initialize());
app.use(passport.session());

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};

app.get('/', authenticateUser, problem);
app.get('/login', login);
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/login',
    successRedirect: '/'
  })
);

app.get('/problem/:problem_id', problem);
app.post('/problem/:problem_id', problem);

app.use(function(req, res, next) {
  next(createError(404, 'Not Found'));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
