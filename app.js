require('dotenv').config();

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => console.log('Connected to mongoDB server'));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const { storeSampleProblems } = require('./loaders/loadSampleProblems');

// storeSampleProblems();

const publicDirectoryPath = path.join(__dirname, './public');
const viewsDirectoryPath = path.join(__dirname, './views');

const app = express();

app.set('view engine', 'ejs');
app.set('views', viewsDirectoryPath);

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
  })
}));
app.use(passport.initialize());
app.use(passport.session());

const index = require('./routes/index');
const login = require('./routes/login');
const auth = require('./routes/auth');
const problems = require('./routes/problems');

app.use('/', index);
app.use('/login', login);
app.use('/auth', auth);
app.use('/problems', problems);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// REVIEW 코드별 기본 메시지 저장되어 있는 라이브러리.
const statuses = require('statuses')

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
