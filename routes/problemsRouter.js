const express = require("express");
const router = express.Router();
const { problemDetailController, postProblemDetailController } = require("../controllers/problem.controller");
const { onlyAuthorizedAllowed } = require("../middlewares");
const Problem = require("../models/Problem");
const dummy = require("../dummydata");

router.get("/add", async function(req, res, next) {
  await Problem.create(dummy);
  res.redirect("/");
});

router.get("/remove", async function(req, res, next) {
  await Problem.remove({});
  res.redirect("/");
});

router.get("/:problem_id", onlyAuthorizedAllowed, problemDetailController);
router.post("/:problem_id", onlyAuthorizedAllowed, postProblemDetailController);

module.exports = router;
