const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const creatError = require('http-errors');
const status = require('statuses');
const session = require("express-session");
const passport = require("passport");
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const sassMiddleware = require('node-sass-middleware');
require('dotenv').config();
require('./loaders/passport');

const db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => console.log('Connected to mongoDB server'));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  dbName: "codeWars"
});

const app = express();

const publicDirectoryPath = path.join(__dirname, './public');
const viewsDirectoryPath = path.join(__dirname, './views');

app.set('view engine', 'ejs');
app.set('views', viewsDirectoryPath);
app.use(express.static(publicDirectoryPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(sassMiddleware({
  src: path.join(__dirname, './scss'),
  dest: path.join(__dirname, './public'),
  indentedSyntax : false,
  outputStyle: 'compressed'
}));

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    dbName: "codeWars",
    collection: "sessions"
  }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(require('./routes'));

app.use(function(req, res, next) {
  next(creatError(404));
});

app.use(errorHandler);

module.exports = app;

function errorHandler(err, req, res, next) {
  const message = err.customErrorMessage?.toLowerCase() || status[err.status];

  res.locals.message = message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);

  res.render('error');
}
