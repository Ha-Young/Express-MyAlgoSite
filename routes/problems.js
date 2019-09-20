const express = require("express");
const router = express.Router();
const problemsController = require("./controllers/problems.controller");

router.get("/", problemsController.getAll);
router.get("/:problem_id", problemsController.get);
router.get("/:level", problemsController.getLevel);
router.post("/:problem_id", problemsController.check);

module.exports = router;
