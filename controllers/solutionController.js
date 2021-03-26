const Problem = require("../models/Problem");
const User = require("../models/User");

exports.getMySolvedProblems = async function(req, res, next) {
  res.render("mySolutions", { title: "My Solution" });
};
