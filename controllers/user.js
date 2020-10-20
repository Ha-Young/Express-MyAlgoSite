const passport = require('passport');

const User = require('../models/User');

exports.getJoin = (req, res, next) => {
  res.render('join', { title: 'JOIN' });
};

exports.postJoin = async (req, res, next) => {
  const {
    body: { username, email, password, confirmPassword },
  } = req;

  if (password !== confirmPassword) {
    return res.status(400).render('join', {
      title: 'Join',
      authErrorMsg: '패스워드가 일치하지 않습니다.',
    });
  }

  try {
    const user = await User({ username, email, password });
    await User.register(user, password);
    next();
  } catch (err) {
    next(err);
  }
};

exports.getLogin = (req, res, next) => {
  res.render('login', { title: 'LOGIN' });
};

exports.postLogin = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
});

exports.getLogout = (req, res, next) => {
  res.redirect('/');
};
