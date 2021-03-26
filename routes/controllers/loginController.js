const passport = require("passport");
const createError = require("http-errors");

exports.getLoginPage = async function(req, res, next) {
  try {
    res.render("login", { title: "login" });
  } catch(err) {
    next(createError(500), "failed to render login page");
  }
};

exports.authenticateUserThroughGoogle = passport.authenticate("google", { scope: ["profile"] });
exports.directUserToRelevantPage = passport.authenticate("google", { failureRedirect: "/login", successRedirect: "/" });
