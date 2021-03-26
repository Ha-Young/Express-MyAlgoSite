const passport = require("passport");

const { signUp } = require("../../services/userService");

const { PAGE, TITLE, PASSPORT } = require("../../constants/constants");

exports.getLogin = (req, res, next) => {
  try {
    res.render(PAGE.LOGIN, { title: TITLE.CODEWARS });
  } catch (error) {
    next(error);
  }
};

exports.getLocalJoin = (req, res, next) => {
  try {
    res.render(PAGE.JOIN, { title: TITLE.JOIN });
  } catch (error) {
    next(error);
  }
};

exports.postLocalJoin = async (req, res, next) => {
  try {
    const user = await signUp(req.body);
    
    await user.save();

    res.redirect("/login");
  } catch (error) {
    if (error.status) {
      next(error.status, error.message);

      return;
    }

    next(error);
  }
};

exports.getLogout = (req, res, next) => {
  req.logout();
  res.redirect("/login");
};

exports.postLogin = passport.authenticate(PASSPORT.LOCAL, { failureRedirect: "/login", successRedirect: "/" });

exports.getGithubLogin = passport.authenticate(PASSPORT.GITHUB);

exports.getGithubLoginCallback = passport.authenticate(PASSPORT.GITHUB, {
  failureRedirect: "/login",
  successRedirect: "/",
});
