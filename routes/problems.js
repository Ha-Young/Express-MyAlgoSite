const express = require('express');
const problemsController = require("../controller/problems.controller");

const router = express.Router();

router.get("/:problem_id", problemsController.get);

module.exports = router;
