const dotenv = require("dotenv");

dotenv.config();

exports.renderIndexPage = function (req, res, next) {
  res.status(200).render("index", { title: "바닐라코딩" });
};
