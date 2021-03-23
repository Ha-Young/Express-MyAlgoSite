const express = require('express');
const router = express.Router();
const { requiresLogin } = require("./middlewares/requiresLogin");
const Problem = require("../models/Problem");

/* GET home page. */
router.get("/", requiresLogin, async (req, res, next) => {
  const allProblems = await Problem.find().lean();
  res.render('index', { title: '바닐라코딩', problems: allProblems });
});

module.exports = router;
