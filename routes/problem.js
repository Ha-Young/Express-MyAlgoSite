const express = require("express");
const router = express.Router();

const problemController = require("./controllers/problems.controller");
const { isAuthenticated } = require("./middlewares/authorization");

router.get("/:problem_id", isAuthenticated, problemController.getProblem);
router.post("/:problem_id", isAuthenticated, problemController.postSolution);

module.exports = router;
