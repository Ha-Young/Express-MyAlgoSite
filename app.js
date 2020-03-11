require('dotenv').config();

const express = require('express');
const path = require('path');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const index = require('./routes/index');
const problems = require('./routes/problems');

const User = require('./models/User');
const Problem = require('./models/Problem');

// load default problems, if [problems] collection is empty
const storeProblems = async () => {
  const hasProblems = await Problem.countDocuments({}).exec();
  if (hasProblems) return;

  const sampleProblems = require('./models/sample_problems.json');
  for (let i = 0; i < sampleProblems.length; i++) {
    await new Problem(sampleProblems[i]).save();
  }
}
storeProblems();

async function findOrCreateUser(profile, cb) {
  try {
    let user = await User.findOne({ githubId: profile.id });
    if (!user) {
      try {
        user = new User({
          githubId: profile.id,
          name: profile.name
        });
        await user.save();
      } catch (err) {
        err.displayMessage = 'error during creating a user';
        throw new Error(err);
      }
    }
    return cb(null, user);
  } catch (err) {
    next(err);
  }
}

passport.use(new GitHubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/login/github/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    return await findOrCreateUser(profile, cb);
  })
);

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());

// maybe I can move those login in to routes/login.js ?
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

app.use('/', index);
app.use('/problems', problems);

app.get('/error', (req, res, next) => {
  const err = req.session.error;
  
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.locals.message = err.message;

  res.status(err.status).render('error');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : { status: err.status };

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  
  // console.log(err.message);

  req.session.error = req.app.get('env') === 'development' ? err : {};
  err.status = err.status || 500;

  // console.log(req.session.error);
  res.status(err.status).redirect('/error');
});

module.exports = app;
