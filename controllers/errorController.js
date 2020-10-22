module.exports = function (err, req, res, next) {
  // set locals, only providing error in development

  console.log(err, 'err status123')

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.statusCode || 500);
  res.render('error');
}