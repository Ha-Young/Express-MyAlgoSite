require('dotenv').config();
const express = require('express');
const passport = require('passport');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const index = require('./routes/index');
const logOut = require('./routes/logOut');
const problems = require('./routes/problems');
const setPassport = require('./middleware/passport');

const app = express();

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', function(){
    console.log('MongoDB Connection Failed!');
});
db.once('open', function() {
    console.log('MongoDB Connected! Success!');
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(session({
  secret: process.env.SESSION_KEY,
  cookie: { maxAge: 60 * 60 * 1000 },
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
setPassport(passport);

app.use('/', index);
app.use('/logout', logOut);
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
