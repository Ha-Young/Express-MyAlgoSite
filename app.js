require('dotenv').config();

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => console.log('Connected to mongoDB server'));

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const publicDirectoryPath = path.join(__dirname, './public');
const viewsDirectoryPath = path.join(__dirname, './views');

const app = express();

app.set('view engine', 'ejs');
app.set('views', viewsDirectoryPath);

app.use(express.static(publicDirectoryPath));
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

const index = require('./routes/index');

app.use('/', index);


app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
