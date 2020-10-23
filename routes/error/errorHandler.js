const mongoose = require('mongoose');
const InternalError = require('../error/InternalError');

function errorHandler(err, req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    if (err instanceof mongoose.Error) err = new InternalError();
    err.stack = null;
  }

  res.locals.message = err.message;
  res.locals.error = err;

  res.status(err.status || 500);
  res.render('error');
}

module.exports = errorHandler;
