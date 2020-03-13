require('dotenv').config();
const express = require('express');
const session = require('express-session');
const index = require('./routes/index');
const login = require('./routes/login');
const logout = require('./routes/logout');
const problems = require('./routes/problems');
const path = require('path');
const passport = require('passport');
const bodyParser = require('body-parser');
const createError = require('http-errors')
const mongoose = require('mongoose');
const db = mongoose.connection;

const app = express();

mongoose.connect('mongodb://localhost/codewars', {
  useNewUrlParser: true, 
  useUnifiedTopology: true ,
  useCreateIndex: true,
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('db connected');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname + '/views'));
app.use(express.static(path.join(__dirname, "./public")));

app.use(session({ secret: process.env.SESSION_SECRET_KEY, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));

app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/problems', problems);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = createError(404, 'Not Found');

  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('asdasd', res.locals)
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
