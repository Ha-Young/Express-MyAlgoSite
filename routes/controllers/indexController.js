const dotenv = require("dotenv");
const Problem = require("../../models/Problem");
const mockdata = require("../../models/sample_problems.json");

dotenv.config();

exports.renderIndexPage = function (req, res, next) {
  // for (const mock of mockdata) {
  //   const problem = new Problem({
  //     id: mock.id,
  //     title: mock.title,
  //     completed_users: mock.completed_users,
  //     difficulty_level: mock.difficulty_level,
  //     description: mock.description,
  //     tests: mock.tests,
  //   });

  //   console.log(problem);
  //   try {
  //     problem.save();
  //   } catch (error) {
  //     next("signIn error");
  //   }
  // }

  res.status(200).render("index", { title: "바닐라코딩" });
};
