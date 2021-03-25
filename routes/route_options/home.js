const express = require('express');
const router = express.Router();
const verifyAuth = require("../../middlewares/verifyAuth");
const verifyUser = require("../../middlewares/verifyUser")
const problemController = require("../../controllers/problemController");

router.get("/", verifyAuth, problemController.fetchAllProblems);
// router.get("/:problem_id", verifyUser, Problem.getSelectedProblem);

module.exports = router;
