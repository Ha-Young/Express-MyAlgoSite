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

    authenticate: (req, res, next) => {
      passport.authenticate('local', (err, user, info) => {

        if (req.session.flash) {
          req.session.flash = {};
        }

        req.flash('message', info.message);

        req.session.save(() => {

          if (err) {
            return next(err);
          }
          if (!user) {
            return res.redirect('/login');
          }

          req.logIn(user, (err) => {
            if (err) {
              return next(err);
            }

            return req.session.save(() => {
              res.redirect('/');
            });
          });
        });

      })(req, res, next);
    }
  };
}
