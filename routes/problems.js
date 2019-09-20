const express = require("express");
const router = express.Router();
const problemsController = require("./controller/problems.controller");

router.get("/:problem_id", problemsController.getProblem);
router.post("/:problem_id/solution", problemsController.checkSolution);

module.exports = router;
