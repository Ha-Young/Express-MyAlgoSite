const express = require("express");

const { checkAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.use("/auth", require("./auth"));

router.use(checkAuthenticated);

router.use("/", require("./home"));
router.use("/problems", require("./problems"));

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
router.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { error: err });
});

module.exports = router;
