const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const passport = require('passport');
const index = require('./routes/index');
const problems = require('./routes/problems');

require('dotenv').config();

const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_ATLAS_CREDENTIAL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('codewars DB connected!!!');
});

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

app.use(logger("short"));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/problems', problems);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error();
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
  res.render('error', {
    title: '바닐라코딩',
    message: (err.status === 404) ? 'Page Not Found' : 'Internal Server Error',
    errorStatus: err.status || 500
  });
});

module.exports = app;
