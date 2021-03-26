const passport = require("passport");

exports.getLoginPage = async function(req, res, next) {
  try {
    res.render("login", { title: "login" });
  } catch (err) {
    next(err);
  }
};

exports.authenticateUserThroughGoogle = passport.authenticate("google", { scope: ["profile"] });
exports.directUserToRelevantPage = passport.authenticate(
  "google", { failureRedirect: "/login", successRedirect: "/" }
);
