const express = require('express');
const router = express.Router();
const Problem = require("../models/Problem");
const { requiresLogin } = require("./middlewares/requiresLogin");
const sample_problems = require("../models/sample_problems.json");

// saveAllSampleProblems();
const saveAllSampleProblems = async () => {
    for (let i = 0; i < sample_problems.length; i++) {
      await new Problem(sample_problems[i]).save();
    }
  };

const problemController = require("./controllers/problems.controller");
router.get("/:problem_id", requiresLogin, problemController.getProblem);
router.post("/:problem_id", requiresLogin, problemController.postSolution);

module.exports = router;
