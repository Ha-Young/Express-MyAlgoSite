const express = require("express");
const problemController = require("../controllers/problems.controller");

const router = express.Router();

router.get("/", problemController.getAll);

module.exports = router;
