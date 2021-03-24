const authCheck = (req, res, next) => {
  // check logged in or not
  if (!req.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};

exports.authCheck = authCheck;
