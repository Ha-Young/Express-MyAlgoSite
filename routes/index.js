const express = require("express");
const router = express.Router();

const home = require("./home");
const login = require("./login");
const auth = require("./auth");
const problems = require("./problems");

router.use("/", home);
router.use("/login", login);
router.use("/auth", auth);
router.use("/problems", problems);

module.exports = router;
