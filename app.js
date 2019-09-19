const express = require('express');
const bodyParser = require('body-parser');

const passportSet = require('./routes/middlewares/googleAuthorize');
const index = require('./routes/index');
const googleAuth = require('./routes/googleAuth');
const problems = require('./routes/problems');

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/app', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('connected') });

app.set('views', './views');
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
passportSet(app);

app.use('/', index);
app.use('/google', googleAuth);
app.use('/problems', problems);

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
