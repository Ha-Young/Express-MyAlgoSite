const { LOGIN_PAGE_URL } = require('../../constants/index');

function validateUser(req, res, next) {
  if (!req.user) {
    res.status(302).redirect(LOGIN_PAGE_URL);

    return;
  }

  next();
}

exports.validateUser = validateUser;
