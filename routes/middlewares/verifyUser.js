const createError = require('http-errors');
const USER = require('../../models/User');

async function verifyUser(req, res, next) {
  if (req.session.passport) {
    try {
      await USER.findById(req.session.passport.user);

      next();
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(301).redirect('/login');
  }
}

exports.verifyUser = verifyUser;
