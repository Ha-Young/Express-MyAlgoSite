const passport = require("passport");

module.exports = function loginCheck(req, res, next) {
  passport.authenticate("jwt", function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.redirect("/login");
    }

    next();
  })(req, res, next);
};
