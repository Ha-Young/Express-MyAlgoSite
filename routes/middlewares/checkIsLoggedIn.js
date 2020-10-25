const { LOGIN_PAGE_URL } = require('../../constants/index');

function checkIsLoggedIn(req, res, next) {
  if (!req.user) {
    try {
      res.status(302).redirect(LOGIN_PAGE_URL);

      return;
    } catch (err) {
      next(err);
    }
  }

  next();
}

exports.checkIsLoggedIn = checkIsLoggedIn;
