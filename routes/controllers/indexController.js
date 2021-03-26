const dotenv = require("dotenv");
const Problem = require("../../models/Problem");
const mockdata = require("../../models/sample_problems.json");

dotenv.config();

exports.renderIndexPage = function (req, res, next) {
  res.status(200).render("index", { title: "바닐라코딩" });
};
