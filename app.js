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
    // console.log('profile', profile);
    User.findOne( { githubId: profile.id }, (err, user) => {
      if (err) { return next(err); }

      if (!user) {
        User.create({ githubId: profile.id }, function (err, user) {
          return cb(null, profile);
        })
      } else {
        return cb(null, profile);
      }
    });
  }
));

passport.serializeUser(function(user, cb) {
  console.log('serial');
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  // User.findById(id, (err, user) => {
  //   next(err, user);
  // });
  console.log('desrial');
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


const port = process.env.PORT;
const db = mongoose.connection;

mongoose.connect(
  `mongodb://localhost:${port}/`,
  {
    dbName: 'users',
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
  var err = new Error();
  err.status = 404;
  next(err);
})

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
