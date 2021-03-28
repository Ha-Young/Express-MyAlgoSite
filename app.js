require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passportSetup = require('./config/passport-setup');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');
const createError = require('http-errors');

const QueryPlugin = require('./util/QueryPlugin');

mongoose.connect(
  process.env.MONGODB_URI,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected..');
  QueryPlugin.dbCheck();
});

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth-routes');
const problemsRoutes = require('./routes/problem-routes');

const app = express();

if (process.env.DB_INITIALIZE === 'true') {
  QueryPlugin.deleteAllProblems();
}

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true);

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/problems', problemsRoutes);

app.use((req, res, next) => {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.status ? err.message : '';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { error: err });
});

module.exports = app;
