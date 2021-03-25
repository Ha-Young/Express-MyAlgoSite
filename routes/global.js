const express = require("express");
const router = express.Router();

const problemController = require("./controllers/problems.controller");
const authController = require("./controllers/auth.controller");

const { isAuthenticated } = require("./middlewares/authorization");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);

router.get("/login/github", authController.getGithubLogin);
router.get("/login/github/callback", authController.getGithubLoginCallback);

router.get("/logout", isAuthenticated, authController.getLogout);
router.get("/", isAuthenticated, problemController.getAllProblems);

module.exports = router;
