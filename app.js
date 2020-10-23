const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const index = require('./routes/index');

const problems = require('./routes/problems');

mongoose.connect('mongodb://localhost/users', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useFindAndModify: false,
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
  secret: 'abcde',
  resave: false,
  saveUninitialized: true,
  testval: 3,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(session({
  secret: 'work hard...',
  resave: true,
  saveUninitialized: false,
}));

app.use('/', index);
app.use('/problems', problems);

app.use((req, res, next) => {
  next({
    errorName: '',
    errorMessage: 'Not Found',
    status: 404,
    reqUrl: req.url,
    location: null,
    displayToUser: '요청한 페이지를 찾을수가 없습니다.',
  });
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  let error;

  if (process.env.NODE_ENV === 'production') {
    error = { displayToUser: err.displayToUser };
  } else if (process.env.NODE_ENV === 'development') {
    error = {
      errorName: err.errorName,
      errorMessage: err.errorMessage,
      errorStatus: err.status || 500,
      reqUrl: err.reqUrl,
      location: err.location,
      displayToUser: null,
    };
  }

  res.status(err.status || 500);
  res.render('error', { ...error });
});

module.exports = app;
