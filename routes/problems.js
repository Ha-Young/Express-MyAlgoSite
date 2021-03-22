const express = require("express");
const router = express.Router();

/* GET problems page. */
router.get("/", (req, res, next) => {
  res.render("problems", { title: "problems" });
});

module.exports = router;
