const express = require("express");
const router = express.Router();
const verifyAuth = require("../middlewares/verifyAuth");
const solutionController = require("../controllers/solutionController");

router.get("/", verifyAuth, solutionController.getMySolutions);

module.exports = router;
