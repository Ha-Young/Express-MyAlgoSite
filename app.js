require('./db');
require('./googleStrategy');
require('dotenv').config();
const passport = require('passport');
const express = require('express');
const app = express();
const session = require('express-session')
const createError = require('http-errors');
const bodyParser = require('body-parser');
const path = require('path');
const login = require('./routes/login');
const index = require('./routes/index');
const problems = require('./routes/problems');
const User = require('./routes/models/User');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findOne({
      email: id.email,
    });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', require('express-ejs-extend'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', login);
app.use('/problem', problems);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, `Can't find ${req.originalUrl} on this server!`));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
