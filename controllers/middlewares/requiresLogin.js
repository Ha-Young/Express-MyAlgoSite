const requiresLogin = (req, res, next) => {
  const { url, user } = req;

  if (!user) {
    if (url === '/') return res.redirect('/login');

    const err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }

  next();
};

module.exports = requiresLogin;
