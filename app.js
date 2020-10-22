const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const login = require('./routes/login');
const problem = require('./routes/problem');

const checkAuth = require('./middlewares/checkAuth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const apiSampleProblems = require('./utils/apiSampleProblems');

require('./config/passport-setup');

apiSampleProblems();

const app = express();

app.use(cookieParser());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [`${process.env.SESSION_KEY}`],
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(passportHandler);

app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', login);
app.use('/problem', checkAuth, problem);
app.use('/', checkAuth, index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
