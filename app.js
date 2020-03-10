require('dotenv').config();

const express = require('express');
const path = require('path');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const index = require('./routes/index');

const app = express();

const User = require('./models/User');

async function findOrCreate(profile, cb) {
  try {
    const user = await User.findOne({ githubId: profile.id });
    if (!user) {
      try {
        user = await User.create({
          githubId: profile.id,
          name: profile.name
        });
      } catch (err) {
        throw new Error('Error occured while creating a user', err);
      }
    }
    return cb(null, user);
  } catch (err) {
    throw new Error(err);
  }
}

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/github/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    return await findOrCreate(profile, cb);
  })
);

passport.serializeUser((user, cb) => {
  // console.log(user);
  cb(null, user)}
  );
passport.deserializeUser((obj, cb) => {
  // console.log(obj);
  cb(null, obj);
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);

app.get('/login', (req, res, next) => {
  res.render('login');
});
app.get('/login/github',
  passport.authenticate('github'));
app.get(
  '/login/github/callback',
  passport.authenticate('github', { failureRedirect: '/login'}),
  (req, res) => res.redirect('/')
);


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
