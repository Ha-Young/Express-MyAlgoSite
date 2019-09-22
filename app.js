const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const index = require('./routes/index');
const authRouter = require('./routes/auth');

const githubPassport = require('./passport');
const app = express();

const dotenv = require('dotenv');
dotenv.config({
  path: './.env'
});

//mongoose setup
mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected!');
});

//middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(
  session({
    secret: 'cat runner',
    resave: true,
    saveUninitialized: true
  })
);

githubPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

app.use('/', index);
app.use('/auth', authRouter);

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
