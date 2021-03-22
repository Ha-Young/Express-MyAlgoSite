const express = require("express");

const problemsController = require("./controllers/problems.controller");

const router = express.Router();

/* GET home page. */
router.get("/", problemsController.getAll);

module.exports = router;
