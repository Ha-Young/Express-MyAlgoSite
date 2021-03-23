const checkAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect("/login");
  }
}

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.redirect("/");
  } else {
    next();
  }
}

module.exports.checkAuthenticated = checkAuthenticated;
module.exports.checkNotAuthenticated = checkNotAuthenticated;
