const express = require("express");
const router = express.Router();

const problemController = require("./controllers/problems.controller");

router.get("/:problem_id", problemController.getOne);

module.exports = router;
