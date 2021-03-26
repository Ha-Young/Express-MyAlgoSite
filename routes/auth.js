const express = require("express");

const { checkNotAuthenticated, checkAuthenticated } = require("../middlewares/auth");
const authController = require("../controllers/auth.controller");

const router = express.Router();

router.get("/login", checkNotAuthenticated, authController.getLogin);
router.get("/register", checkNotAuthenticated, authController.getRegister);

router.post("/login", authController.postLogin);
router.post("/register", authController.postRegister);

router.delete("/logout", checkAuthenticated, authController.logout);

module.exports = router;
