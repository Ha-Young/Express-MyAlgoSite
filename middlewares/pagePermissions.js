const pagePermissions = {
  publicPage: (req, res, next) => {
    if (req.user) {
      res.redirect('/');
    } else {
      next();
    }
  },

  privatePage: (req, res, next) => {
    if (!req.user) {
      res.redirect('/login');
    } else {
      next();
    }
  }
};

module.exports = pagePermissions;
