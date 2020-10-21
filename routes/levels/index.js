/* eslint-disable no-unused-vars */
const express = require("express");

const Problem = require("../../models/Problem");

const router = express.Router();

router.get("/:difficult_level", async (req, res, next) => {
  const problems = await Problem.find({ difficulty_level: req.params.difficult_level });

  res.render("problems", {
    data: problems,
  });
});

module.exports = router;
