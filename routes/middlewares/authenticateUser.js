module.exports = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.name = req.user?.name || null;
    next();
  } else {
    res.status(301).redirect("/auth");
  }
};
