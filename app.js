const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

const index = require('./routes/index');
const login = require('./routes/login');
const problems = require('./routes/problems');

const app = express();

if (process.env.NODE_ENV === 'development') {
  const Problem = require("./models/Problem");
  const mockProblems = require('./models/sample_problems.json');

  const init = async () => {
    await Problem.deleteMany({});

    for (let i = 0; i < mockProblems.length; i++) {
      await Problem.create(mockProblems[i]);
    }
  };

  init();
  app.use(morgan('dev'));
}

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', index);
app.use('/login', login);
app.use('/problems', problems);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// error handler
app.use(globalErrorHandler);

module.exports = app;
