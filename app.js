const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('express-flash');
require('dotenv').config();

const index = require('./routes/index');
const problems = require('./routes/problems');

const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_ATLAS_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("🔥🌏🔥 MongoDB Atlas database connected successfully!");
});

const User = require('./models/User');

const GithubPassport = require('./config/passport-gitHub');
GithubPassport(passport);

const LocalPassport = require('./config/passport-local');
LocalPassport(
  passport,
  async (email) => await User.findOne({ email }),
);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(cookieParser(process.env.SESSION_SECRET));
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: process.env.SESSION_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(morgan('dev'));
app.use(flash());
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
  if(req.user === undefined){
    res.locals.user = null;
  }

  next();
});

app.use('/', index);
app.use('/problems', problems);

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
