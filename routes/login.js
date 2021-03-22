const express = require("express");
const logInController = require("./controllers/logInController");
const router = express.Router();
const authHandler = require("../routes/middlewars/authHandler");
const passport = require("passport");

router.get("/", logInController.renderLoginPage);
router.post("/auth/tokens", authHandler.create);

module.exports = router;
