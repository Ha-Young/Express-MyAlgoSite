require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const index = require('./routes/index');
const login = require('./routes/login');
const logout = require('./routes/logout');
const problems = require('./routes/problems');

const passportSetup = require('./config/passport');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const passport = require('passport');
const bodyParser = require('body-parser');

const app = express();

app.set('trust proxy', 1)
app.use(session({
  secret: 'fdsfafaf',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views'));

mongoose.connect(keys.mongoDB.dbURI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
  console.log('connected to mongodb');
});

app.use(express.static('public'));

const checkAuthentication = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else{
    res.redirect('/login');
  }
};



app.use('/login', login);
app.use('/', checkAuthentication, index);
app.use('/logout', checkAuthentication, logout);
app.use('/problems', checkAuthentication, problems);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
