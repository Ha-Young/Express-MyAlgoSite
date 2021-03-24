const { Router } = require("express");

const ProblemController = require("./controllers/problems");
const loginCheck = require("./middlewares/loginCheck");

const route = Router();

module.exports = function authRouter(app) {
  app.use('/problems', loginCheck, route);

  route.get("/:problem_id", ProblemController.viewProblem);

  // app.post("/problem/:id", ProblemController.sendSolution);
};
