module.exports = {
  renderLogin: (req, res, next) => {
    const isAuthenticated = req.isAuthenticated();

    res.render('login', {
      isAuthenticated,
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
