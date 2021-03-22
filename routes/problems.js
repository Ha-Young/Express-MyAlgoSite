const express = require("express");
const router = express.Router();
const problems = require("../models/sample_problems.json");

router.get("/:problem_id", (req, res, next) => {
  const { problem_id } = req.params;
  console.log(problem_id);
  res.render("problems", { problems: problems });
});

module.exports = router;
