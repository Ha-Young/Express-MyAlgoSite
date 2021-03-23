const express = require("express");

const problemController = require("../controllers/problems.controller");
const authenticateUser = require("../middlewares/autheticate");

const router = express.Router();

router.get("/:problem_id", authenticateUser, problemController.detail);

router.post("/:problem_id", authenticateUser, problemController.checkCode);

module.exports = router;
