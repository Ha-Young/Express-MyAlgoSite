function localsMiddleware (req, res, next) {
  res.locals.user = req.user;
  next();
};

//export const 
exports.localsMiddleware = localsMiddleware;
