module.exports = (req, res, next) => {
  console.log('auth');
  if (!req.isAuthenticated()) return res.status(302).redirect('/login');

  next();
};
