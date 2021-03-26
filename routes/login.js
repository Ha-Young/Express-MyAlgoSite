const express = require("express");
const router = express.Router();
const verifyUser = require("./middlewares/verifyUser");
const loginController = require("./controllers/loginController");

router.get("/", verifyUser, loginController.getLoginPage);
router.get("/google", loginController.authenticateUserThroughGoogle);
router.get("/google/callback", loginController. directUserToRelevantPage);

module.exports = router;
