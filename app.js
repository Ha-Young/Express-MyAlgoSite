const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const morgan = require('morgan');
const indexRouter = require('./routes/index');
const problemsRouter = require('./routes/problems')
const app = express();
const passport = require('passport');
const userPassport = require('./middleware/passport');
require('dotenv').config();

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: process.env.YOUR_SECRET_KEY,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

userPassport(passport);

app.set('views', './views');
app.set('view engine', 'ejs');


app.use(morgan('dev'));

app.use('/', indexRouter);
app.use('/problems', problemsRouter);

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
  if(err.status === 500){
    err.status = "";
    err.message = "internal server error";
  }
  res.render('error');
});

if(!process.env.NODE_ENV){
  process.env.uri = process.env.ATLAS_URI
}

mongoose.connect(process.env.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
  console.log('connected to mongodb server');
});


module.exports = app;
