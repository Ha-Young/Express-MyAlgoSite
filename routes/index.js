const express = require("express");
const router = express.Router();
const problems = require("../models/sample_problems.json");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { problems: problems });
});

module.exports = router;
