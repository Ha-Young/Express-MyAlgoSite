const User = require('../../models/User');

const salt = 10;

exports.index = ((req, res, next) => {
});

exports.register = async (
  {
    body: { email, password, username },
    session,
  },
  res,
  next,
) => {
  await User.create({
    email, username, password, salt,
  }, (err, user) => {
    if (err) {
      return next(err);
    }

    session.userId = user._id;
    return res.redirect('/problems');
  });
};

exports.moveLoginPage = (req, res, next) => {
  res.render('login', { notificationMessage: null, inputedEmail: null });
};

exports.moveRegisterPage = (req, res, next) => {
  res.render('register', { notificationMessage: null, inputedEmail: null });
};

exports.login = ((req, res, next) => {
  res.redirect('/');
});

exports.logout = async (
  {
    session,
  },
  res,
  next,
) => {
  delete session.userId;
  res.redirect('/login');
};
