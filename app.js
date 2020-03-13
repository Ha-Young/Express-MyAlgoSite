const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');

const middlewares = require('./middleware');
const index = require('./routes/index');
const problem = require('./routes/problem.js');

require('./passport');

const app = express();

middlewares.onMongoose();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: process.env.MONGO_URL,
      collection: 'sessions'
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(middlewares.setLocals);

app.use('/', index);
app.use('/problem', problem);

app.use(function(req, res, next) {
  const err = new Error('페이지를 찾을 수 없습니다.');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { message: err.message });
});

module.exports = app;
