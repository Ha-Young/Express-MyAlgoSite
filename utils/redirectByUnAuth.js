const redirectByUnAuth = (req, res, next) => {
  debugger;
  if (req.user) return next();
  res.redirect("/login");
};

module.exports = redirectByUnAuth;
