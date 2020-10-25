module.exports = {
  renderLogin: (req, res, next) => {
    res.render('login', {
      isAuthenticated: req.isAuthenticated(),
    });
  },

  logout: async (req, res, next) => {
    try {
      req.logout();

      res.redirect('/');
    } catch (err) {
      if (err) next(err);
    }
  }
};
