require('dotenv').config();
require('./db');

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const path = require('path');

const index = require('./routes/index');
const login = require('./routes/login');
const problems = require('./routes/problems');
const passportConfig = require('./passport');

// const Problem = require('./models/Problem');
// const mockData = require('./models/sample_problems.json');

// const createDB = async () => {
//   await Problem.create(mockData);
// }
// createDB();

const app = express();

app.engine('ejs', require('express-ejs-extend'));
app.set('view engine', 'ejs');
app.set('views', './views');

passportConfig(passport);
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/login', login);
app.use('/problems', problems);
app.use(express.static(path.join(__dirname, 'public')));

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
