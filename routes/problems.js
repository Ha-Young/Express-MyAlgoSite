const router = require("express").Router();
const { getProblem } = require(`${__dirname}/controllers/problems.controller`);

router.get("/:problem_id", getProblem);

module.exports = router;