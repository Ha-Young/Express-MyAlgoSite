const express = require('express');
const router = express.Router();
const verifyAuth = require("../../middlewares/verifyAuth");

router.get("/", verifyAuth, (req, res, next) => {
  res.render("index", { title: "Codewars" });
});

module.exports = router;
