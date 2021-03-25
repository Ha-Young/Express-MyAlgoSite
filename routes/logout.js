const express = require("express");
const router = express.Router();

router.get("/", async function (req, res) {
  req.session.destroy(function (err) {
    res.redirect("/");
  })
});

module.exports = router;