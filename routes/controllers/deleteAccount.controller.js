const User = require('../../models/User');

exports.get = (req, res, next) => {
  res.render('deleteAccount');
};

exports.callback = async (req, res, next) => {
  const email = req.session.passport.user.email;

  try {
    await User.deleteOne({ email: email });
    req.session.destroy();
    res.redirect('/sign-in');
  } catch (e) {
    next(e);
  }
};
