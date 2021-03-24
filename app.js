const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const app = express();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const index = require('./routes/index');
const auth = require('./routes/auth');
const problems = require('./routes/problems');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

const clientPromise = mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(m => m.connection.getClient());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(session({
  saveUninitialized: false,
  resave: false,
  secret: process.env.SECRET_SESSION,
  store: MongoStore.create({
    clientPromise,
  }),
  cookie: {
    //secure: true,
    httpOnly: true,
    expires: new Date(Date.now() + 60 * 60 * 1000)
  }
}));

require('./auth/passport')(app);

//because of flash timing issue,
// made highorder middleware
app.use((req, res, next) => {
  flash()(req, res, next);
});

app.use('/', index);
app.use('/auth', auth); //auth로 변경예정
app.use('/problems', problems);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// error handler
app.use(globalErrorHandler);

module.exports = app;
