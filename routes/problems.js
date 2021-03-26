const express = require("express");
const router = express.Router();
const { isAuth } = require("./middlewares/authorization");
const problemsController = require("./controllers/problems.controller");

router.get("/:problem_id", isAuth, problemsController.getOneProblem);

router.post("/:problem_id", isAuth, problemsController.submitProblem);

module.exports = router;
