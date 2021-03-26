const creatError = require('http-errors');
const User = require('../../models/User');

async function verifyUser(req, res, next) {
  if (req.isAuthenticated()) {
    try {
      res.locals.userInfo = await User.findById(req.user);

      next();
    } catch {
      next(creatError(500));
    }
  } else {
    res.status(301).redirect('/login');
  }
}

exports.verifyUser = verifyUser;
