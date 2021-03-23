const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  req.logout();
  res.status(308).redirect("/");
});

module.exports = router;
