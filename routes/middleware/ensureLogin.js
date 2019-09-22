const ensureLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else {
    res.redirect('/auth');
  }
};

module.exports = ensureLoggedIn;
