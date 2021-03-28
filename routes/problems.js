const express = require("express");
const router = express.Router();
const { isAuth } = require("./middlewares/authorization");
const problemsController = require("./controllers/problems.controller");

router.get("/:problem_id", isAuth, problemsController.getProblem);

router.post("/:problem_id", isAuth, problemsController.saveProblem);

module.exports = router;
