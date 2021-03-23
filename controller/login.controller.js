const passport = require("passport");
const createError = require("http-errors");

exports.get = async (req, res, next) => {
  try {
    res.render("login");
  } catch (err) {
    next(createError(500, err.message));
  }
};

exports.post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});
