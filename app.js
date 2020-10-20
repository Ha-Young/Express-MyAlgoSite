require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const db = require('./config/db');
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);
require('./config/passport');

const expressLayouts = require('express-ejs-layouts');

const globalRouter = require('./routes/global');
const problemsRouter = require('./routes/problems');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);

app.use(express.static('public'));

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: db }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  const { user } = req;

  res.locals.user = user || null;
  console.log('Current User : ', user);
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
  res.render('error', { title: 'Error' });
});

module.exports = app;
