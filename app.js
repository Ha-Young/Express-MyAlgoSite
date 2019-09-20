const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

const index = require('./routes/index');

const app = express();

require('./config/passport');
require('dotenv').config();

mongoose.connect(process.env.DATABASE, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connection'));

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.cookieKey]
}));

// req 객체에 passport 설정
app.use(passport.initialize());
// req.session 객체에 passport 정보를 저장
app.use(passport.session());


// view를 ejs로 설정
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// css, js 파일 연결
app.use(express.static(__dirname + '/public'));

// req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);

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
