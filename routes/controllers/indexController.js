const dotenv = require("dotenv");

dotenv.config();

exports.renderIndexPage = function (req, res, next) {
  console.log(req.isAuthenticated());
  console.log(req.user);
  console.log("is logged in", req.user);

  res.status(200).render("index", { title: "바닐라코딩" });
};
