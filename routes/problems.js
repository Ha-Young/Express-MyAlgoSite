const router = require("express").Router();

const problemsController = require("../controllers/problem.controller");
const { verifyProblemId } = require("../middlewares/problem");

router.get("/", problemsController.getAll);
router.get("/:problem_id", verifyProblemId, problemsController.getByEachId);

router.post("/:problem_id", verifyProblemId, problemsController.postByEachId);

module.exports = router;
