const dotenv = require("dotenv");

dotenv.config();

exports.handleLogout = function (req, res, next) {
  console.log("in!!");
  res.clearCookie("jwt").redirect("/");
};
