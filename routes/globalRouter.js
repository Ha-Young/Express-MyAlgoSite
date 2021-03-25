const express = require("express");
const router = express.Router();
const { mainController } = require("../controllers/main.controller");
const { loginController, postLoginController, getGoogleController, getGoogleCallbackController, logoutContorller } = require("../controllers/login.controller");
const { joinController, postJoinController } = require("../controllers/join.controller");
const { redirectToHome } = require("../middlewares");

router.get("/", mainController);

router.get("/login", loginController);
router.post("/login", postLoginController);
router.get("/logout", logoutContorller);
router.get("/login/google", getGoogleController);
router.get("/login/google/callback", getGoogleCallbackController, redirectToHome);

router.get("/join", joinController);
router.post("/join", postJoinController);

module.exports = router;
