const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const indexRouter = require('./routes/index');
const problemsRouter = require('./routes/problems');
const app = express();
const passport = require('passport');
const userPassport = require('./routes/middleware/passport');
require('dotenv').config();

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('connected to mongodb server');
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.YOUR_SECRET_KEY,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

userPassport(passport);

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.use('/', indexRouter);
app.use('/problems', problemsRouter);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  if (err.status === 500) {
    err.message = 'Internal Server Error ';
  }
  res.render('error');
});

module.exports = app;
