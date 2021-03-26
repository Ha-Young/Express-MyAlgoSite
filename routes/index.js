const express = require("express");

const { checkAuthenticated } = require("../middlewares/auth");

const router = express.Router();

router.use("/auth", require("./auth"));

router.use(checkAuthenticated);

router.use("/", require("./home"));
router.use("/problems", require("./problems"));

module.exports = router;
