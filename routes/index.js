const express = require("express");
const router = express.Router();
const Problem = require("../models/Problem")

/* GET home page. */

router.get("/", async (req, res, next) => {
  const user = await req.user;
  const problems = await Problem.find();

  res.render("index", {
    email: user.email,
    problemList: problems,
  });
});

module.exports = router;
