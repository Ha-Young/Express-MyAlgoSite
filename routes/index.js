const express = require("express");
const router = express.Router();
const problems = require("../models/sample_problems.json");

router.get("/", (req, res, next) => {
  res.render("index");
});

module.exports = router;
