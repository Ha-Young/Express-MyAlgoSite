exports.home = function (req, res, next) {
  res.render('pages/index', { user: req.user || {} });
};
