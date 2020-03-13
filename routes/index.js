const express = require("express");
const router = express.Router();
const sampleProblems = require("../models/sample_problems");
// TODO✅: ❓json 파일을 가지고 오는 방법? => 일반 require 방식과 같음

const Problem = require("../models/Problem");
/* GET home page. */
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
