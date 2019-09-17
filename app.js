require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
// const cookieSession = require('cookie-session');
const passport = require('passport');

const index = require('./routes/index');
const login = require('./routes/login');
const auth = require('./routes/auth');

const app = express();


app.set('views', './views');
app.set('view engine', 'ejs');

// app.use(cookieSession({
//   maxAge: 24 * 60 * 60* 1000,
//   keys: [process.env.COOKIE_KEY]
// }));


require('./config/passport')(passport);



mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('we are connected!');
});

app.use(require('morgan')('combined'));
app.use(require('cookie-parser')(process.env.COOKIE_KEY));
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({
  secret: 'secret code',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false
  }
}));


app.use(passport.initialize());
app.use(passport.session());

// app.use(helmet.hsts({
//   maxAge: 10886400000,
//   includeSubdomains: true
// }));


app.use(express.static('public'));

app.use('/', index);
app.use('/login', login);
app.use('/auth', auth);

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
