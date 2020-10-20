const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const setPassport = require('./utils/auth');
const index = require('./routes/index');
const auth = require('./routes/auth');

const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

setPassport();
app.use(passport.initialize()); // initialize
app.use(passport.session()); // 만약 있다면 세션으로부터 auth restore

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', index);
app.use('/auth', auth);

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
