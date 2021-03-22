const express = require('express');
const router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "바닐라코딩", name: req.user?.name || "guest" });
});

module.exports = router;
