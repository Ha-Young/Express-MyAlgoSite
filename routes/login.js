const express = require("express");
const router = express.Router();

/* GET login page. */
router.get("/", (req, res, next) => {
  res.render("login", { title: "login" });
});

module.exports = router;
