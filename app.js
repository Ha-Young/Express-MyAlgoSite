if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config();
}
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const compression = require('compression');
const helmet = require('helmet');
const setPassport = require('./utils/auth');
const index = require('./routes/index');
const auth = require('./routes/auth');
const problems = require('./routes/problems');

const app = express();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, () => {
  console.log('mongodb is connected!');
});

app.use(helmet());
app.use(compression());

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.static('utils'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'secrettexthere',
  saveUninitialized: true,
  resave: true,
}));

setPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use('/', index);
app.use('/auth', auth);
app.use('/problems', problems);

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
