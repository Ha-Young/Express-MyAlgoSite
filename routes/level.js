const express = require('express');
const router = express.Router();
const { requiresLogin } = require("./middlewares/requiresLogin");
const Problem = require("../models/Problem");

router.get("/:difficulty_level", requiresLogin, async(req,res, next) => {
  const level = req.params.difficulty_level;
  const filteredTitle = await Problem.find({difficulty_level: level}).select(["title", "id"]);
  res.render('index', { allTitle: filteredTitle });
});

module.exports = router;