const express = require("express");
const router = express.Router();

const validationHandler = require("./middlewars/validationHandler");
const loginController = require("./controllers/loginController");
const authHandler = require("../routes/middlewars/authHandler");

router.get("/", loginController.renderLoginPage);
router.post("/auth/tokens", validationHandler.login, authHandler.signToken);

module.exports = router;
