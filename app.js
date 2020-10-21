require('dotenv').config();
require('./config/db');
require('./config/passport');

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const passport = require('passport');
const session = require('express-session');

const expressLayouts = require('express-ejs-layouts');
const sassMiddleware = require('node-sass-middleware');

const globalRouter = require('./routes/global');
const problemsRouter = require('./routes/problems');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(sassMiddleware(require('./config/sass')));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(session(require('./config/session')));

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use('/problems', problemsRouter);
app.use('/', globalRouter);

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
  res.render('error', { title: 'ERROR' });
});

module.exports = app;
