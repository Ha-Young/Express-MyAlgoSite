require('dotenv').config();
require('./db');
require('./passport');

const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const expressLayouts = require('express-ejs-layouts');

const index = require('./routes/index');
const auth = require('./routes/auth');
const problems = require('./routes/problems');
const api = require('./routes/api');

const errorHandler = require('./routes/error/errorHandler');
const RequestError = require('./routes/error/RequestError');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', path.join(__dirname, 'views/layout/layout'));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}));

app.use(expressLayouts);
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/auth', auth);
app.use('/problems', problems);
/* TEST ROUTER: WILL BE DELETED SOON */
app.use('/api', api);

app.use(function(req, res, next) {
  next(RequestError.notFound());
});
app.use(errorHandler);

module.exports = app;
