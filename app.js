const express = require('express');
const path = require('path');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');

const keys = require('./config/keys');

mongoose.connect(
  keys.mongodb.dbURI,
  { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
  console.log("Connected..");
});

// const problem_db = require('./util/problem_db');
// const Problem = require('./models/Problem');

// problem_db.storeMockProblems()
// .then(() => {
//   Problem.find()
//   .lean()
//   .exec(function (err, problems) {
//     if (err) return next(err.message);
//     return JSON.stringify(problems);
//   });
// });

// problem_db.deleteAllProblems();

const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth-routes');
const problemsRoutes = require('./routes/problem-routes');

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.set('layout', 'layout');
app.set('layout extractScripts', true);

// encrypt cookie
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/problems', problemsRoutes);

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
