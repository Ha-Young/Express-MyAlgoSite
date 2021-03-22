const { TITLE } = require("./constants/common");

exports.localMiddleware = (req, res, next) => {
  res.locals.siteTitle = TITLE.SITE;

  next();
};
