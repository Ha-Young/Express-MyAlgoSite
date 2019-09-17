const router = require('express').Router();
const passport = require('passport');


// GET /auth/github
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in GitHub authentication will involve redirecting
//   the user to github.com.  After authorization, GitHub will redirect the user
//   back to this application at /auth/github/callback
router.get(
  '/github',
  passport.authenticate('github') //{ scope: [ 'user:email' ] }
);

// GET /auth/github/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function will be called,
//   which, in this example, will redirect the user to the home page.
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }), function(req, res) {
    console.log(req.session, 'session');
    console.log(req.user, 'req');
    res.redirect('/');
  }
);

router.get(
  '/logout',
  function(req, res, next){
    if(req.session){
      console.log('logout');
      console.log(req.session, 'before');
      req.session.destroy(function(err) {
        if(err) {
          return next(err);
        } else {
          return res.redirect('/');
        }
      })
      console.log(req.session, 'check deleted ');
    }
  }
);

module.exports = router;
