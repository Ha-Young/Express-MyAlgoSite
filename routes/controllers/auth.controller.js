const passport = require("passport");
const createError = require("http-errors");

const { signUp } = require("../../services/userService");
const { ErrorHandler } = require("../../util/error");

exports.getLogin = (req, res) => {
  res.status(200).render("login", { title: "Codewars" });
};

exports.getLocalJoin = (req, res) => {
  res.status(200).render("join", { title: "Join" });
};

exports.postLocalJoin = async (req, res, next) => {
  try {
    const { user, error } = await signUp(req.body);
    
    if (error) {
      throw new ErrorHandler(error.status, error.message);
    }
    
    if (user) {
      await user.save();
    }

    res.redirect("/login");
  } catch (error) {
    next(createError(error));
  }
};

exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect("/login");
};

exports.postLogin = passport.authenticate("local", { failureRedirect: "/login", successRedirect: "/" });

exports.getGithubLogin = passport.authenticate("github");

exports.getGithubLoginCallback = passport.authenticate("github", { failureRedirect: "/login", successRedirect: "/" });
