const express = require("express");
const router = express.Router();
const { isLoggedIn, isNotLoggedIn } = require("../middleware/checkLogin");
const mainController = require("../controller/mainController");
const authController = require("../controller/authController");

router.get("/", isLoggedIn, mainController.getHome);

router.get("/login", isNotLoggedIn, authController.getLogin);
router.post("/login", isNotLoggedIn, authController.postLogin);

router.get("/register", isNotLoggedIn, authController.getRegister);
router.post("/register", isNotLoggedIn, authController.postRegister);

router.get("/logout", isLoggedIn, authController.getLogout);

router.get("/level/:level", isLoggedIn, mainController.getLevel);
router.get("/solved", isLoggedIn, mainController.getSolved);
router.get("/unsolved", isLoggedIn, mainController.getUnsolved);

module.exports = router;
