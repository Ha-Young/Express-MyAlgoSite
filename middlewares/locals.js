const setLocals = (req, res, next) => {
  res.locals.siteName = 'CodeWars';
  res.locals.loggedUser = req.user;
  next();
};

module.exports = setLocals;
