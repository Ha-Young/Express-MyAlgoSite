const passport = require("passport");

module.exports.loginController = function loginController(req, res, next) {
  res.render("login", { title: "Sign In" });
}

module.exports.postLoginController = function postLoginController(req, res, next) {
  const {
    body: { email, password }
  } = req;

  next();
}

const getGoogleController = passport.authenticate("google", { scope: ["profile", "email", "openid"] });

module.exports.getGoogleController = getGoogleController;

const getGoogleCallbackController = passport.authenticate("google", {
  successRedirect: "/",
  failureRedirect: "/login",
});

module.exports.getGoogleCallbackController = getGoogleCallbackController;
