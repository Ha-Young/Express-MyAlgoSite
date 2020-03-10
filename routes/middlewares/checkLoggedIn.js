export default (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.redirect(302, '/login');
};
