const express = require("express");
const passport = require("passport");
const router = express.Router();
const verifyAuth = require("../../middlewares/verifyAuth");
const verifyUser = require("../../middlewares/verifyUser");
const solutionController = require("../../controllers/solutionController");

//router.get("/", solutionController.getAllSolutions);

//module.exports = router;
