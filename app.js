/* eslint-disable no-unused-vars */
require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const mongoose = require("mongoose");

const passportModule = require('./config/passport');

const SECRET_URL = process.env.MONGO_URL;

mongoose.connect(SECRET_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const index = require('./routes/index');
const login = require('./routes/login');
const problems = require('./routes/problems');

const app = express();

// secret : 쿠키 임의 변조하는 것 방지. 세션을 암호화 시켜 저장.
// resave : 세션을 언제나 저장할 것인지 정하는 값. false 권장.. 왜....?
// saveUnitialized : 세션에 저장되기 전에 초기화되지 않은 값으로 미리 만들어서 저장.
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

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static('routes'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);
app.use('/login', login);
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
  res.render('error');
});

module.exports = app;
