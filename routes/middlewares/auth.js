export const checkLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) next();
  else res.redirect(302, '/login');
};

export const setLocalsLoggedUser = (req, res, next) => {
  res.locals.loggedUser = req.user || null;
  next();
};
