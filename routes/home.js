const express = require('express');
const router = express.Router();
const verifyAuth = require("./middlewares/verifyAuth");
const problemController = require("./controllers/problemController");

router.get("/", verifyAuth, problemController.getAllProblems);

module.exports = router;
