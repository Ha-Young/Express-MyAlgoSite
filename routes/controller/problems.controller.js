const Problems = require("../../models/Problem");
const ObjectId = require("mongoose").Types.ObjectId;
const vm = require("vm");

exports.getAll = async function(req, res, next) {
  try {
    const problems = await Problems.find();
    res.render("index", { title: "Codewars", user: req.user, problems });
  } catch (err) {
    res.status(500).send({
      error: "Internal Server Error"
    });
  }
};

exports.getProblem = async function(req, res, next) {
  try {
    const problem = await Problems.findOne({ _id: req.params.problem_id });
    res.render("problems", { user: req.user, problem });
  } catch (err) {
    next();
  }
};

exports.checkSolution = async function(req, res, next) {
  try {
    if (!ObjectId.isValid(req.params.problem_id)) {
      return next();
    } else {
      const testProblem = await Problems.findById(req.params.problem_id);
      let results = [];
      try {
        results = testProblem.tests.map(test => {
          const code = req.body.solution + test.code;
          const script = new vm.Script(code);
          const context = vm.createContext({});
          const answer = script.runInContext(context, { timeout: 1000 });

          if (answer === test.solution) {
            return {
              message: "success",
              resultValue: answer,
              expectValue: test.solution
            };
          } else {
            return {
              message: "failure",
              resultValue: answer,
              expectValue: test.solution
            };
          }
        });
      } catch (err) {
        return res.render("failure", { user: req.user, err });
      }

      if (results.some(result => result.message === "failure")) {
        res.render("failure", { user: req.user, results });
      } else {
        res.render("success", { user: req.user, results });
      }
    }
  } catch (err) {
    next(err);
  }
};
