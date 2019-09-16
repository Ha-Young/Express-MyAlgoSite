const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

require('dotenv').config();

const index = require('./routes/index');

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/codewars', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('codewars DB connected!!!');
});

// const Mongoose = require('mongoose').Mongoose;
// const userMongoose = new Mongoose();
// userMongoose.connect('mongodb://localhost:27017/user', {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// });

// const userDb = userMongoose.connection;
// userDb.on('error', console.error.bind(console, 'user DB connection error:'));
// userDb.once('open', function () {
//   console.log('user DB connected!');
// });

// const problemMongoose = new Mongoose();
// problemMongoose.connect('mongodb://localhost:27017/problem', {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// });

// const problemDb = problemMongoose.connection;
// problemDb.on('error', console.error.bind(console, 'problem DB connection error:'));
// problemDb.once('open', function () {
//   console.log('problem DB connected!');
// });

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('./public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);

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
