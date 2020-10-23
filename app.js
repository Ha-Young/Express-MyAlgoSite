require('dotenv').config();

const express = require('express');
const index = require('./routes/index');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const login = require('./routes/login');
const problems = require('./routes/problems');
const auth = require('./routes/auth');
const app = express();
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;
const User = require('./models/User');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/github/callback'
},
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ githubId: profile.id }, (err, user) => {
      if (err) { return next(err); }

      if (!user) {
        User.create({ githubId: profile.id }, (err, user) => {
          return cb(null, profile);
        });
      } else {
        return cb(null, profile);
      }
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

const db = mongoose.connection;

mongoose.connect(
  `mongodb://localhost:27017/codewars`,
  {
    dbName: 'codewars',
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
  },
  () => console.log('connected')
);

app.use('/', index);
app.use('/login', login);
app.use('/auth', auth);
app.use('/problems', problems);

app.use(function (req, res, next) {
  const error = new Error('Not Found');
  error.status = 404;
  next(err);
})

app.use(function(err, req, res, next) {
  res.locals.errorMessage = err.message || 'Internal Server Error';
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
