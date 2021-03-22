const express = require("express");
const problemController = require("../controllers/problems.controller");

const router = express.Router();

router.get("/:problem_id", problemController.detail);

module.exports = router;
