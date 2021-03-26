exports.get = (req, res, next) => {
  res.render('signOut');
};

exports.callback = (req, res, next) => {
  if (req.session) {
    try {
      req.logOut();
      req.session.destroy();
      res.redirect('/sign-in');
    } catch (e) {
      next(e);
    }
  }
};
