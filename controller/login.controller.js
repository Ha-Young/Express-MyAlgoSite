const passport = require("passport");

exports.get = async (req, res, next) => {
  res.render("login");
};

exports.post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});
