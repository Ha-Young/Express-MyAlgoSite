const express = require('express');
const router = express.Router();
const Problem = require("../models/Problem");
const { requiresLogin } = require("./middlewares/requiresLogin");
const { getPercentage } = require("../utils/getPercentage");

router.get("/:difficulty_level", requiresLogin, async(req,res, next) => {
  const level = req.params.difficulty_level;
  const filteredProblem = await Problem.find({
    difficulty_level: level})
  .select([
    "title", "completed_count", "failure_count", "id"
  ]);

  for (let i = 0; i < filteredProblem.length; i++) {
    const passed = filteredProblem[i].completed_count;
    const failed = filteredProblem[i].failure_count;
    const passRate = getPercentage(passed, failed);

    filteredProblem[i].passRate = passRate;
  }
  res.render('index', { problem: filteredProblem });
});

module.exports = router;
