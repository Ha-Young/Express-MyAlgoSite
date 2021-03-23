const express = require("express");
const router = express.Router();

const problemController = require("./controllers/problems.controller");

router.get("/:problem_id", problemController.getProblem);

router.post("/:problem_id", problemController.postSolution);

module.exports = router;
