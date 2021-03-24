const express = require('express');
const problemsController = require("../controller/problems.controller");
const checkAuth = require("../middlewares/checkAuthenticated");

const router = express.Router();

router.get("/:problem_id", checkAuth.checkAuthenticated, problemsController.get);
router.post("/:problem_id/submit", checkAuth.checkAuthenticated, problemsController.submit);

module.exports = router;
