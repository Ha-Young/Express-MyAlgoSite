/* eslint-disable no-unused-vars */
const express = require("express");

const router = express.Router();

router.get("/", (req, res, next) => {
  res.clearCookie("loginToken");
  res.redirect("/login");
});

module.exports = router;
