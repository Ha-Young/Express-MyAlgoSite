function verifyUser(req, res, next) {
  if (req.user) {
    res.redirect("/");
    return;
  }

  next();
}

module.exports = verifyUser;
