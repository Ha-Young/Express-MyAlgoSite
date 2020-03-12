function unsetContext (req, res, next) {
  const url = req.url;

  if(url !== '/failure' && url !== '/success') {
    req.session.context = {};
  }

  next();
}
function localsMiddleware (req, res, next) {
  res.locals.user = req.user;
  next();
}

function onlyPrivate (req, res, next) {
  if (req.user) {
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

module.exports = { unsetContext, localsMiddleware, onlyPrivate, onlyPublic };
