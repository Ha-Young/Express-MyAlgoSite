const InternalError = require('./InternalError');

function errorHandler(err, req, res, next) {
  if (err instanceof InternalError) {
    err.stack = null;
  }

  res.locals.message = err.message;
  res.locals.error = err;

  res.render('error');
};

module.exports = errorHandler;
