const express = require("express");
const router = express.Router();
const { authenticateUser } = require("./middlewares/authenticateUser");
const problemsController = require("./controllers/problems.controller");
const userController = require("./controllers/user.controller");

router.get("/", authenticateUser, userController.store, problemsController.getAll);

module.exports = router;
