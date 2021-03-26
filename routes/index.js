const express = require('express');
const router = express.Router();
const { requiresLogin } = require("./middlewares/requiresLogin");
const Problem = require("../models/Problem");
const { getPercentage } = require("../utils/getPercentage");

router.get("/", requiresLogin, async (req, res, next) => {
  const problem = await Problem.find().select(["title", "completed_count", "failure_count", "id"]);

  for (let i = 0; i < problem.length; i++) {
    const passed = problem[i].completed_count;
    const failed = problem[i].failure_count;

    const passRate = getPercentage(passed, failed);
    problem[i].passRate = passRate;
  }

  res.render('index', { problem: problem });
});

module.exports = router;
