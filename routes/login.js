const router = require('express').Router();

router.get('/', (req, res, next) => {
  res.render('login');
});





// router.get('/auth/kakao', isLoggedIn, passport.authenticate('kakao', {
//   successRedirect: '/',
//   failureRedirect: '/fail'
// }));

// router.get('/kakao_oauth', passport.authenticate('kakao', {
//   successRedirect: '/',
//   failureRedirect: '/fail'
// }));

// router.get('/auth/facebook', isLoggedIn, passport.authenticate('facebook', {
//   successRedirect: '/',
//   failureRedirect: '/fail'
// }));

// router.get('/facebook_oauth', passport.authenticate('facebook', {
//   successRedirect: '/',
//   failureRedirect: '/fail'
// }));

// function isLoggedIn(req, res, next) {
//   if (!req.isAuthenticated()) {
//     return next();
//   } else {
//     res.redirect('/');
//   }
// }

module.exports = router;
