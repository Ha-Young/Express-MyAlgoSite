const express = require('express');
const morgan = require('morgan');

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
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
