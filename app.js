const express = require('express');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const index = require('./routes/index');
const login = require('./routes/login');
const problem = require('./routes/problem');
const checkAuth = require('./middlewares/checkAuth');
const apiSampleProblems = require('./utils/apiSampleProblems');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

require('./config/passport-setup');

apiSampleProblems();

const app = express();

app.use(cookieParser());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [`${process.env.SESSION_KEY}`],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', login);
app.use('/problem', problem);
app.use('/', index);
// app.use('/problem', checkAuth, problem);
// app.use('/', checkAuth, index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new AppError('Not Found', 404));
});

// error handler
app.use(globalErrorHandler);

module.exports = app;
