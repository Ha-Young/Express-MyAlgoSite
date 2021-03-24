const { Router } = require("express");

const ProblemController = require("./controllers/problems");

const route = Router();

module.exports = function authRouter(app) {
  app.use('/problems', route);

  route.get("/:problem_id", ProblemController.viewProblem);

  // app.post("/problem/:id", ProblemController.sendSolution);
};
