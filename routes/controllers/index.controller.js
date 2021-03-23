exports.getHome = (req, res, next) => {
  if (req.user) {
    res.locals.user = { name: req.user.displayName };
  } else {
    res.locals.user = null;
  }

  res.render("index");
};
