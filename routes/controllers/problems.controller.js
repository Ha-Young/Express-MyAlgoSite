const Problem = require("../../models/Problem");
const User = require("../../models/User");
const vm = require("vm");

exports.getAll = async function(req, res, next) {

  try {
    if (req.params.level === "all" || !req.params.level) {
      var problem = await Problem.find();
    } else {
      var problem = await Problem.find({
        difficulty_level: Number(req.params.level)
      });
    }
    var problem = await Problem.find();
    res.render("index", {
      username: req.user.userName,
      level: req.params.level,
      problem: problem
    });
  } catch (e) {
    next();
  }
};
exports.get = async function(req, res, next) {
  try {
    var problem = await Problem.find({ _id: req.params.problem_id });
    res.render("problemDetail", {
      username: req.user.userName,
      level: req.params.level,
      problem: problem[0]
    });
  } catch (e) {
    next();
  }
};
exports.getLevel = async function(req, res, next) {
  try {
    if (req.params.level === "all") {
      var problem = await Problem.find();
    } else {
      var problem = await Problem.find({
        difficulty_level: Number(req.params.level)
      });
    }
    res.render("index", {
      username: req.user.userName,
      level: req.params.level,
      problem: problem
    });
  } catch (e) {
    next();
  }
};
exports.check = async function(req, res, next) {
  var problem = await Problem.find({ _id: req.params.problem_id });
  var user = await User.find({ userName: req.user.userName });
  var checkAnswer = 0;
  var result = [];
  for (var i = 0; i < problem[0].tests.length; i++) {
    var answer = req.body.solution.concat(" ", problem[0].tests[i].code);
    try {
      const script = new vm.Script(answer);
      const context = vm.createContext({});
      var yourResult = script.runInContext(context, { timeout: 100 });
      if (!yourResult) yourResult = "UNDEFINED";
      var test = {
        expect: problem[0].tests[i].solution,
        your_answer: yourResult,
        result: ""
      };
      if (problem[0].tests[i].solution === String(yourResult)) {
        checkAnswer++;
        test.result = "success";
      } else {
        test.result = "failure";
      }
    } catch (e) {
      var yourResult = e.message;
      var test = {
        expect: problem[0].tests[i].solution,
        your_answer: yourResult,
        result: "failure"
      };
    }
    result.push(test);
  }
  if (checkAnswer === problem[0].tests.length) {
    for (var i = 0; i < user[0].problem.length; i++) {
      if (
        user[0].problem[i].id === problem[0].id &&
        !user[0].problem[i].completed
      ) {
        user[0].problem[i].completed = true;
        problem[0].completed_users++;
        await problem[0].save();
        await user[0].save();
      }
    }
    res.render("success.ejs", {
      username: req.user.userName,
      level: req.params.level,
      problem: problem[0],
      result: result
    });
  } else {
    res.render("failure.ejs", {
      username: req.user.userName,
      level: req.params.level,
      problem: problem[0],
      result: result
    });
  }
};
