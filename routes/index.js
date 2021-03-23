const express = require("express");
const router = express.Router();
const { isAuth } = require("./middlewares/authorization");
const problemsData = require("../models/sample_problems.json");

/* GET home page. */
router.get("/", isAuth, (req, res, next) => {
  res.render("index", {
    problems: problemsData
  });
});

router.get("/problems/:problem_id", (req, res, next) => {
  const id = parseInt(req.params.problem_id);
  const [ problem ] = problemsData.filter(problem => problem.id === id);

  res.render("problem", { problem });
})

module.exports = router;
