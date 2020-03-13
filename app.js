require('dotenv').config();

const express = require('express'),
      path = require('path'),
      morgan = require('morgan'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      session = require('express-session'),
      MongoStore = require('connect-mongo')(session);

const home = require('./routes/home'),
      login = require('./routes/login'),
      problems = require('./routes/problems');

const errors = require('./lib/error');

const app = express();

require('./config/mongoose');
require('./config/passport');
passport.serializeUser((user, cb) => cb(null, user));
passport.deserializeUser((user, cb) => cb(null, user));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'codewars secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 5 },
  store: new MongoStore({ url : process.env.MONGODB_URI })
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', home);
app.use('/login', login);
app.use('/problems', problems);

app.use(function(req, res, next) {
  next(new errors.InvalidUrlError('Invalid url.'));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.displayMessage;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
