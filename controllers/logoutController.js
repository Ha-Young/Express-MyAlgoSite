const createError = require("http-errors");

exports.getLogOut = async function(req, res, next) {
  try {
    req.logout();
    res.redirect("/login");
  } catch (err) {
    next(createError(500), "failed to logout");
  }
};
