const { MongoError } = require('mongodb');
const AppError = require('../utils/appError');

const handleCastError = (err) => {
  console.log(1)
  const message = `Invalid Problem number: ${err.value}`
  return new AppError(message, 400);
};

const handleMongoError = (err) => {
  if (err.code === 11000) {
    const message = `${keyValue}가 중복되었습니다.`
    return new AppError(message, 400);
  }
}

const handleDbValidationError = (err) => {
  if (err.kind === 'required') {
    const message = `${err.path} 항목은 필수 항목입니다.`
    return new AppError(message, 400);
  }
}

const sendErrorDev = (err, res) => {
  return res.render('error', {
    message: res.locals.message,
    error: res.locals.error
  })
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    return res.render('error', {
      message: err.message
    });
  }
  console.error('Error alert for Dev');
  res.render('error', {
    message: 'An error occured'
  });
}

module.exports = function (err, req, res, next) {
  // set locals, only providing error in development
  console.log('gb err', err.errmsg)
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.statusCode || 500);
  if (req.app.get('env') === 'development') {
    console.log('gb err devv ')

    return sendErrorDev(err, res);
  }
  let error = {...err};
  if (err.name === 'CastError') error = handleCastError(error);
  if (err.name === 'MongoError') error = handleMongoError(error);
  if (err.name === 'ValidationError') error = handleDbValidationError(error);
  console.log(error, 213)
  
  sendErrorProd(error, res);
}