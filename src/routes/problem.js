const { Router } = require("express");

const ProblemController = require("./controllers/problems");
const adminCheck = require("./middlewares/adminCheck");
const loginCheck = require("./middlewares/loginCheck");

const route = Router();

module.exports = function problemRouter(app) {
  app.use('/problems', loginCheck, route);

  route.get("/create", adminCheck, ProblemController.viewCreateProblem);
  route.get("/delete/:problem_id", ProblemController.deleteProblem);
  route.get("/:problem_id", ProblemController.viewProblem);

  route.post("/create", adminCheck, ProblemController.createProblem);
  route.post("/:problem_id", ProblemController.solveProblem);
};
