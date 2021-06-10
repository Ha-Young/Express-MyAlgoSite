const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const path = require("path");
const { format } = require("date-fns");

const passportLoader = require("./passport");
const { logger } = require("./logger");

module.exports = function ({ app, routerLoader }) {
  app.set("view engine", "ejs");
  app.use(expressLayouts);

  app.set("layout", "layout");

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(express.static(path.resolve(__dirname, "../../public")));
  app.use(cookieParser());

  //passport
  passportLoader({ app });

  // router
  routerLoader({ app });

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    res.render('pages/404', { user: req.user || {} });
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    logger.error(format(new Date(), 'yyyy-MM-dd hh:mm:ss'), err);

    // render the error page
    res.status(err.status || 500);
    res.render('pages/error', { user: req.user || {} });
  });
};
