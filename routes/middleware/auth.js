const auth = async (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    if (req.route.path === '/') {
      res.status(301).redirect('/login');
    } else if (req.route.path === '/:problem_id') {
      const err = new Error('Not Authenticated');
      err.status = 401;
      next(err);
    }
  }
};

module.exports = auth;
