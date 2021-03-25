module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.isLogIn = req.isAuthenticated();
    res.locals.name = req.user.name || "이름 모를";
    next();
  } else {
    res.status(301).redirect("/auth");
  }
};
