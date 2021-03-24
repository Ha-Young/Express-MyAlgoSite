/**
 * @description if user is already logged in, then redirect to home
 */
const redirectToHomeWhenAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  return next();
}

module.exports = redirectToHomeWhenAuthenticated;
