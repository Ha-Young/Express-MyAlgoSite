const express = require("express");
const router = express.Router();
const { authenticateUser } = require("./middlewares/authenticateUser");
const problemsController = require("./controllers/problems.controller");

router.get("/:problem_id", authenticateUser, problemsController.showProblem);
router.post("/:problem_id", authenticateUser, problemsController.checkCode);

module.exports = router;
