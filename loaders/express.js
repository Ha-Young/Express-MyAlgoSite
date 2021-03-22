const cors = require("cors");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const { format } = require("date-fns");

const { logger } = require("./logger");

module.exports = function ({ app, routerLoader }) {
  app.set("view engine", "ejs");

  app.use(cors());

  app.use(express.json());
  app.use(express.static(path.resolve(__dirname, "../public")));

  routerLoader({ app });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    logger.error(format(new Date(), 'yyyy-MM-dd hh:mm:ss'), err);

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });
};
