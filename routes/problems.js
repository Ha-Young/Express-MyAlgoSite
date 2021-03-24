const express = require("express");
const router = express.Router();
const problemsController = require("../routes/controllers/problems.controller");
const { authenticateUser } = require("../routes/middlewares/authorization");

router.get("/:problem_id", authenticateUser, problemsController.getProblem);
router.post("/:problem_id", authenticateUser, problemsController.postProblem);

module.exports = router;