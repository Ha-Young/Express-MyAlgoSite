const express = require("express");
const router = express.Router();

const athenticate = require("../middleware/athenticate");

const home = require("./home");
const login = require("./login");
const auth = require("./auth");
const problems = require("./problems");
const logout = require("./logout");
const levels = require("./levels");

router.use("/login", login);
router.use("/auth", auth);
router.use(athenticate);

router.use("/", home);
router.use("/problems", problems);
router.use("/logout", logout);
router.use("/levels", levels);

module.exports = router;
