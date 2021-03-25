const passport = require("passport");

const { signUp } = require("../../services/userService");
const { ErrorHandler } = require("../../util/error");

exports.getLogin = (req, res, next) => {
  try {
    res.status(200).render("login", { title: "Codewars" });
  } catch (error) {
    next(error);
  }
};

exports.getLocalJoin = (req, res, next) => {
  try {
    res.status(200).render("join", { title: "Join" });
  } catch (error) {
    next(error);
  }
};

exports.postLocalJoin = async (req, res, next) => {
  try {
    const { user, error } = await signUp(req.body);
    
    if (error) {
      throw new ErrorHandler(error);
    }
    
    if (user) {
      await user.save();
    }

    res.redirect("/login");
  } catch (error) {
    next(error);
  }
};

exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect("/login");
};

exports.postLogin = passport.authenticate("local", { failureRedirect: "/login", successRedirect: "/" });

exports.getGithubLogin = passport.authenticate("github");

exports.getGithubLoginCallback = passport.authenticate("github", { failureRedirect: "/login", successRedirect: "/" });
