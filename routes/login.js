const express = require("express");
const logInController = require("./controllers/logInController");
const router = express.Router();

router.get("/", logInController.renderLoginPage);

module.exports = router;
