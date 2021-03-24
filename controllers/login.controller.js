const User = require('../models/User');
const catchAsync = require('../utils/catchAsync')

module.exports = function (passport) {
  return {
    getLoginForm: (req, res, next) => {
      const flashMessage = req.flash().error?.[0] ?? '';

      res.render('login', {
        title: 'Login',
        flashMessage,
      });
    },

    getSignUpForm: (req, res, next) => {
      res.render('signup', { message: req.flash('info') });
    },

    createUser: catchAsync(async (req, res, next) => {
      if (await User.findOne({ email: req.body.email })) {
        req.flash('info', 'email already exist');
        return res.redirect('/login/signup');
      }

      if (await User.findOne({ username: req.body.username })) {
        req.flash('info', 'username already exist');
        return res.redirect('/login/signup');
      }

      const user = await User.create(req.body);
      console.log(user);

      res.status(201).json({
        user
      })
    }),

    authenticateLocal: passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  };
}
