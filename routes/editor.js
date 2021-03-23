const express = require('express');
const router = express.Router();

/* GET editor page. */
router.get("/", (req, res, next) => {
  res.render("codeEditor");
});

module.exports = router;
