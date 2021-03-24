const express = require('express');
const router = express.Router();
const Problem = require("../models/Problem");
const dummy = require("../routes/dummydata");

router.get("/add", async function(req, res, next) {
  await Problem.create(dummy);
  res.redirect("/");
});

router.get("/remove", async function(req, res, next) {
  await Problem.remove({});
  res.redirect("/");
});

module.exports = router;
