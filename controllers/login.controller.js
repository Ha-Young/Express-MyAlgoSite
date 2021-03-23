module.exports = function (passport) {
  return {
    getLoginForm: (req, res, next) => {
      console.log(req.session);
      const flashMessage = req.flash().error?.[0] ?? '';

      res.render('login', {
        title: 'Login',
        flashMessage,
      });
    },

    authenticate: passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true
    })
  };
}
