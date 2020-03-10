const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const middlewares = require('./middleware');
const index = require('./routes/index');
require('./passport');

const app = express();

middlewares.onMongoose();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.use(express.static(path.join(__dirname, './public')));
app.use(bodyParser.urlencoded());

app.use(
  session({
    secret: 'wKhgw3WcOGV5KDM4kRxl3I0bquW1GoWW',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      url: 'mongodb://localhost/codewars',
      collection: 'sessions'
    })
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(middlewares.setLocals);

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
  res.render('error', { message: err.message });
});

module.exports = app;
