const bcrypt = require('bcrypt');
const User = require('../../models/User');

exports.get = (req, res, next) => {
  res.render('signUp');
};

exports.post = async (req, res, next) => {
  const email = await User.findOne({ email: req.body.email });

  if (email) {
    req.flash("usedEmail", "등록된 이메일입니다.");
    res.redirect('/sign-in');

    return;
  }

  try {
    const hash = await bcrypt.hash(req.body.password, 10);

    await User.create({
      username: req.body.name,
      email: req.body.email,
      password: hash,
    });

    res.redirect('/sign-in');
  } catch (e) {
    next(e);
  }
};
