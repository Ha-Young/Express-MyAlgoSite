module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) return res.status(302).redirect('/login');

  next();
};
