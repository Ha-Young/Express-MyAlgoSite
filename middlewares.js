function localsMiddleware (req, res, next) {
  res.locals.user = req.user;
  next();
}

function onlyPrivate (req, res, next) {
  if (true) {
    next();
  } else {
    res.redirect('/');
  }
}

function onlyPublic (req, res, next) {
  if (req.user) {
    res.redirect('/');
  } else {
    next();
  }
}

module.exports = { localsMiddleware, onlyPrivate, onlyPublic };
