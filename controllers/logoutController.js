exports.getLogOut = async function(req, res, next) {
  try {
    req.logout();
    res.redirect("/login");
  } catch (err) {
    next(err);
  }
};
