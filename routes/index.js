const express = require("express");
const router = express.Router();
const sampleProblems = require("../models/sample_problems");

const Problem = require("../models/Problem");
router.get("/", async (req, res, next) => {
  let problems = await Problem.find();
  if (!problems.length) {
    await Problem.insertMany(sampleProblems).catch(err => {
      next(err);
    });
  }
  const githubId = req.user ? req.user.githubId : undefined;
  res.render("index", { title: "코드전쟁", problems: problems, login: githubId });
});

module.exports = router;
