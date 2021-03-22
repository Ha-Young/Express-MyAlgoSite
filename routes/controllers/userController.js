const dotenv = require("dotenv");

dotenv.config();

exports.renderUserPage = function (req, res, next) {
  res.status(200).render("user", { title: "UserPage" });
};
