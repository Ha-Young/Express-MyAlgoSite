require('dotenv').config();
//production environment..??

const express = require('express');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');

const passport = require('passport');
const setPassport = require('./authorization/passport');

const indexRouter = require('./routes/index');
const problemsRouter = require('./routes/problems');

const app = express();
const mongoose = require('mongoose');

const db = mongoose.connection;
const MONGODB_SERVER_URL = process.env.MONGODB_SERVER_URL;

mongoose.connect(MONGODB_SERVER_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});
db.on('error', function () {
  console.error.bind(console, 'connection error:');
});
db.once('open', function() {
  console.log('mongo DB connected!');
});

setPassport(passport);

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('short'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'codewars.ico')));

app.use(cookieParser());
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 24 * 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/problems', problemsRouter);

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
  err.message = 'Sorry... Internal Server ERROR..';
  err.status = err.status || 500;
  res.render('error', { err });
});

module.exports = app;
