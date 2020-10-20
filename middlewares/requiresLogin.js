const requiresLogin = (req, res, next) => {
  const { user } = req;

  if (!user) {
    const err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }

  next();
};

module.exports = requiresLogin;
