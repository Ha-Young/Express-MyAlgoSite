exports.renderLoginTemplate = (
  req,
  res,
  next,
) => {
  res.render('login', { error: null });
};

exports.redirectToMain = (
  req,
  res,
  next,
) => {
  res.redirect('/');
};

exports.logout = (
  req,
  res,
  next,
) => {
  req.logout();
  res.redirect('/');
};
