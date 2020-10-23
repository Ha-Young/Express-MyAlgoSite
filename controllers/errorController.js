const AppError = require('../utils/appError');

const handleCastError = (err) => {
  const message = `Invalid Problem number: ${err.value}`;
  return new AppError(message, 400);
};

const handleMongoError = (err) => {
  if (err.code === 11000) {
    const message = `${keyValue}가 중복되었습니다.`;
    return new AppError(message, 400);
  }
};

const handleDbValidationError = (err) => {
  if (err.kind === 'required') {
    const message = `${err.path} 항목은 필수 항목입니다.`;
    return new AppError(message, 400);
  }
};

const sendErrorDev = (err, res) => {
  return res.status(err.status).render('error', { err });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.status(err.status).render('error', { err });
  }
  res
    .status(err.status)
    .render('error', { err: { message: 'Internal Server Error' } });
};

module.exports = function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  err.status = err.status || 500;
  if (req.app.get('env') === 'development') {
    return sendErrorDev(err, res);
  }
  let error = { ...err };
  if (err.name === 'CastError') {
    error = handleCastError(error);
  } else if (err.name === 'MongoError') {
    error = handleMongoError(error);
  } else if (err.name === 'ValidationError') {
    error = handleDbValidationError(error);
  } else if (err.name === 'SyntaxError') {
    sendErrorProd(new AppError(error.message, 400), res);
  } else if (err.name === 'Unexpected identifier') {
    sendErrorProd(new AppError(err.message, 400), res);
  } else if (err.name === 'ReferenceError') {
    sendErrorProd(new AppError(err.message, 400), res);
  }
};
