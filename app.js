const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => console.log('connected'));

const app = express();
const index = require('./routes/index');
const auth = require('./routes/auth');
const problems = require('./routes/problems');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: true,
  saveUninitialized: true
}));
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/auth', auth);
app.use('/problems', problems);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  res.render('error', { error: err });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  err.status = 500;
  res.render('error', { error: err });
});

module.exports = app;
