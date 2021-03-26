const express = require("express");
const router = express.Router();
const { mainController } = require("../controllers/main.controller");
const { getGoogleController, getGoogleCallbackController, logoutContorller } = require("../controllers/login.controller");
const { redirectToHome } = require("../middlewares");

router.get("/", mainController);

router.get("/logout", logoutContorller);
router.get("/login/google", getGoogleController);
router.get("/login/google/callback", getGoogleCallbackController, redirectToHome);

module.exports = router;
