const passport = require("passport");

const getGoogleController = passport.authenticate("google", { scope: ["profile", "email", "openid"] });

module.exports.getGoogleController = getGoogleController;

const getGoogleCallbackController = passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login",
});

module.exports.getGoogleCallbackController = getGoogleCallbackController;

module.exports.logoutContorller = function logoutContorller(req, res, next) {
  req.logout();
  res.redirect("/");
}
