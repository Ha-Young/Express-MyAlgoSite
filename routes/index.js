const express = require("express");
const router = express.Router();
const { authenticateUser } = require("./middlewares/authenticateUser");
const problemsController = require("./controllers/problems.controller");

router.get("/", authenticateUser, problemsController.getAll);

module.exports = router;
