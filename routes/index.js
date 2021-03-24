const express = require("express");
const router = express.Router();
const { isAuth } = require("./middlewares/authorization");
const problemsController = require("./controllers/problems.controller");

/* GET home page. */
router.get("/", isAuth, problemsController.getProblems);

module.exports = router;
