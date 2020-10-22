const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const GitHubStrategy = require('passport-github').Strategy;
const index = require('./routes/index');
const login = require('./routes/login');
const problem = require('./routes/problem');
const User = require('./models/User');
const checkAuth = require('./middlewares/checkAuth');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const apiSampleProblems = require('./utils/apiSampleProblems');
const passportHandler = require('./config/passport-setup');

apiSampleProblems();

const app = express();

app.use(cookieParser());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [`${process.env.SESSION_KEY}`],
  })
);

app.use(passport.initialize());
app.use(passport.session());
// app.use(passportHandler);

passport.serializeUser((user, done) => {
  console.log(1);
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  console.log(2);
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    {
      clientID: `${process.env.CLIENT_ID_GITHUB}`,
      clientSecret: process.env.CLIENT_SECRET_GITHUB,
      callbackURL: process.env.CALLBACK_URL_GITHUB,
    },
    async (accessToken, refreshToken, profile, cb) => {
      console.log(3);
      const searched = await User.findOne({ github_id: profile.id });
      if (searched) return cb(null, searched);

      const created = await User.create({
        github_id: profile.id,
        github_token: accessToken,
      });

      if (created) return cb(null, created);
      //error case handle
    }
  )
);

app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', login);
app.use('/problem', checkAuth, problem);
app.use('/', checkAuth, index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
