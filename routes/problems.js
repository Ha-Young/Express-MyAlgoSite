const express = require("express");
const passport = require("passport");
const router = express.Router();
const verifyAuth = require("./middlewares/verifyAuth");
const problemController = require("./controllers/problemController");

router.get("/:problemId", verifyAuth, problemController.getSelectedProblem);
router.post("/:problemId", verifyAuth, problemController.postSelectedProblemSolution);

module.exports = router;
