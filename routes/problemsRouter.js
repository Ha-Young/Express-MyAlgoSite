const express = require("express");
const router = express.Router();
const { problemDetailController, postProblemDetailController } = require("../controllers/problem.controller");
const { onlyAuthorizedAllowed } = require("../middlewares");
const Problem = require("../models/Problem");
const dummy = require("../dummydata");

router.get("/:problem_id", onlyAuthorizedAllowed, problemDetailController);
router.post("/:problem_id", onlyAuthorizedAllowed, postProblemDetailController);

module.exports = router;
