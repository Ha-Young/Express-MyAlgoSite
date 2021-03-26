const express = require("express");
const router = express.Router();
const { getProblem, checkSolution } = require("../controllers/problemController");

router.get("/:problem_id", getProblem);

router.post("/:problem_id", checkSolution);

module.exports = router;
