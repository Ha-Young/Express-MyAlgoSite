const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("logout");
});

module.exports = router;
