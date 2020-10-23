require('dotenv').config();
require('./db');
require('./passport');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const expressLayouts = require('express-ejs-layouts');

const index = require('./routes/index');
const auth = require('./routes/auth');
const problems = require('./routes/problems');

const errorHandler = require('./routes/error/errorHandler');
const RequestError = require('./routes/error/RequestError');
const ROUTERS = require('./constants').ROUTERS;

const app = express();
const store = new MongoDBStore({
  uri:
    process.env.NODE_ENV === 'production'
      ? process.env.DB_PRODUCTION_ADDRESS
      : process.env.DB_LOCAL_ADDRESS,
  databaseName: 'codewars',
  collection: 'session'
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', path.join(__dirname, 'views/layout/layout'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store
  })
);

app.use(expressLayouts);
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use(ROUTERS.HOME, index);
app.use(ROUTERS.AUTH, auth);
app.use(ROUTERS.PROBLEMS, problems);

app.use(function (req, res, next) {
  next(RequestError.notFound());
});
app.use(errorHandler);

app.listen(function () {
  console.log(`[SERVER] start - env: ${process.env.NODE_ENV}`);
});

module.exports = app;
