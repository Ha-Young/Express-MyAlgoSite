const createError = require("http-errors");

module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    // next(createError(401, { message: "unauthorized" }));
    res.redirect("/users/login");
  }
};
