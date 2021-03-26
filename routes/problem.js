const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middleware/checkLogin");
const problemController = require("../controller/problemController");

router.get("/:problem_id", isLoggedIn, problemController.getProblem);
router.post("/:problem_id", isLoggedIn, problemController.postProblem);

module.exports = router;
