const express = require("express");
const Problem = require("../models/Problem");
const { verifyUser } = require("./middlewares/verifyUser");
const router = express.Router();

router.get("/", verifyUser, async (req, res) => {
  const tests = await Problem.find({});
  console.log(tests);
  res.render("index", { tests });
});

module.exports = router;
