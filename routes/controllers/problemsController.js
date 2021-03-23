const dotenv = require("dotenv");

dotenv.config();

exports.renderProblemsPage = function (req, res, next) {
  console.log("req user", req.user);
  console.log("is logged in when auth provided", req.isAuthenticated());
  res.locals.login = req.isAuthenticated();
  res.status(200).render("problems", { title: "problems" });
};
