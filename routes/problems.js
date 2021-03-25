const router = require("express").Router();

const { renderMain, renderEachProblem, testUserCode } = require("../controllers/problem.controller");
const { verifyProblemId } = require("../middlewares/problem");

router.get("/", renderMain);

router.get("/:problem_id", verifyProblemId, renderEachProblem);

router.post("/:problem_id", verifyProblemId, testUserCode);

module.exports = router;
