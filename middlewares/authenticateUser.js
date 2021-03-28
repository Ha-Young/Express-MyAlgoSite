const authenticateUser = (req, res, next) => {
  try {
    if (req.isAuthenticated()) return next();
    return res.redirect("/login");
  } catch (error) {
    return res.redirect("/login");
  }
};

module.exports = authenticateUser;
