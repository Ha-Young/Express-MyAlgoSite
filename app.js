const express = require('express');

const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');

const userPassport = require('./middlewares/passport');
const index = require('./routes/index');
const loginRouter = require('./routes/login');

require('dotenv').config();

const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://localhost:27017/codewars', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo DB connected!');
});

const app = express();

app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: process.env.SESSION_SECRET, cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session()); //로그인 세션 유지

userPassport(passport);

app.use('/', index);
app.use('/login', loginRouter);
app.get('/logout', function(req, res){
  req.logout();
  res.status(301).redirect('/login');
});

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
