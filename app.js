const express = require('express');
const bodyParser = require('body-parser')
const index = require('./routes/index');
const login = require('./routes/login');
const problems = require('./routes/problems');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/genius', { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('connected successful'))
 .catch((err) => console.log(err));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use('/login', login);
app.use('/', index);
app.use('/problems', problems);
app.use(express.static('public'));
app.use(require('morgan')('combined'));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: "734053947240-k8spbsl29su6u3ircvhdm2rqg8eu1mce.apps.googleusercontent.com",
  clientSecret: "om5mdhrrWFI5_pHeyZkkeVF2",
  callbackURL: "/"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

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
