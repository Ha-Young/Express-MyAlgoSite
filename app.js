require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const compression = require('compression');

const passportModule = require('./config/passport');
const db = require('./config/mongoose');

const indexRoutes = require('./routes/index');
const loginRoutes = require('./routes/login');
const logoutRoutes = require('./routes/logout');
const problemsRoutes = require('./routes/problems');

const app = express();

app.use(compression());

db();

app.use(
  session({
    secret: process.env.SECRET_CODE,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);

passportModule(passport);
app.use(passport.initialize());
app.use(passport.session());

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('routes'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRoutes);
app.use('/login', loginRoutes);
app.use('/problems', problemsRoutes);
app.get('/logout', logoutRoutes);

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.displayMessage;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
