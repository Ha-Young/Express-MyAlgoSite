const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const morgan = require('morgan');

const db = require('./db');
const index = require('./routes/index');
const login = require('./routes/login');
const logout = require('./routes/logout');
const problems = require('./routes/problems');

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false
  })
);

db();
require('./passport');

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/problems', problems);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  if (err.status = 404) {
    res.render('error', {
      errorDescription: '존재하지 않는 페이지입니다',
      errorStatus: 404,
      errorMessage: 'Not Found'
    });
  } else {
    res.render('error', {
      errorDescription: '서비스 불가',
      errorStatus: 500,
      errorMessage: 'Internal Server Error'
    });
  }
});

module.exports = app;
