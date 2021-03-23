const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const Problem = require("../models/Problem");

/* GET home page. */

router.get("/", async (req, res, next) => {
  try {
    const user = await req.user;
    const problems = await Problem.find();

    res.render("index", {
      email: user.email,
      problemList: problems,
    });
  } catch (err) {
    next(createError(500, err.message));
  }
});

module.exports = router;
