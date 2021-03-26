const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const creatError = require('http-errors');
const status = require('statuses');
require('dotenv').config();
require('./loaders/passport');

const db = mongoose.connection;

db.on('error', console.error);
db.once('open', () => console.log('Connected to mongoDB server'));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// const { storeSampleProblems } = require('./loaders/loadSampleProblems');
// storeSampleProblems();

const app = express();

const publicDirectoryPath = path.join(__dirname, './public');
const viewsDirectoryPath = path.join(__dirname, './views');

app.set('view engine', 'ejs');
app.set('views', viewsDirectoryPath);

const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
  src: path.join(__dirname, './scss'),
  dest: path.join(__dirname, './public'),
  indentedSyntax : false,
  outputStyle: 'compressed'
}));
app.use(express.static(publicDirectoryPath));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const session = require("express-session");
const passport = require("passport");
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    collection: "sessions"
  }),
}));
app.use(passport.initialize());
app.use(passport.session());

const index = require('./routes/index');
const login = require('./routes/login');
const auth = require('./routes/auth');
const problems = require('./routes/problems');
const user = require('./routes/user');
const { verifyUser } = require('./routes/middlewares/verifyUser');

app.use('/login', login);
app.use('/auth', auth);
app.use(verifyUser);
app.use('/', index);
app.use('/problems', problems);
app.use('/user', user);

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
