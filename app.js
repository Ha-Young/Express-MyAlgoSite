require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const problemsRouter = require('./routes/problems');
const schemas = require('./models');
const passportConfig = require('./passport');
passportConfig(passport);

const app = express();
schemas();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: true,
  saveUninitialized: false, 
  secret: process.env.COOKIE_SECRET,
  cookie: {
    maxAge: 1000 * 60,
    httpOnly: true,
    secure: false,
  }
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/problems', problemsRouter);

app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
