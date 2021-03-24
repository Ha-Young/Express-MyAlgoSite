exports.getHome = (req, res, next) => {
  res.render('index', { user: req.user });
};
