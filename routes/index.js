const express = require("express");
const router = express.Router();

const problemSample = require("../models/sample_problems.json");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const user = await req.user;
  res.render("index", {
    email: user.email,
    problems: problemSample,
  });
});

module.exports = router;
