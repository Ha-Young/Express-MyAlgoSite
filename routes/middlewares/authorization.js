const verifyAuth = (req, res, next) => {
    if (req.isAuthenticated()) {
      next();
    }
  };

exports.verifyAuth = verifyAuth;
