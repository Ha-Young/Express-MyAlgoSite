require('dotenv').config();
require('./db');

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const index = require('./routes/index');
const login = require('./routes/login');
const problems = require('./routes/problems');
const passportConfig = require('./passport');

const app = express();

app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

passportConfig(passport);
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);
app.use('/login', login);
app.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect(302, '/login');
});
app.use('/problems', problems);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', {
    username: req.user.username,
  });
});

module.exports = app;
