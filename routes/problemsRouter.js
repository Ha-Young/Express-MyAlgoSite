const express = require("express");
const router = express.Router();
const { problemDetailController } = require("../controllers/problem.controller");
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

router.get("/:problem_id", problemDetailController);

module.exports = router;
