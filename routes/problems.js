const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const verifyProblemId = require("../middlewares/verifyProblemId");
const problemController = require("../controllers/problemController");

router.get("/:problemId", verifyAuth, verifyProblemId, problemController.getSelectedProblem);
router.post("/:problemId", verifyAuth, problemController.postSelectedProblemSolution);

module.exports = router;
