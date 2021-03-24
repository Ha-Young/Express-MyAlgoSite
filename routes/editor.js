const express = require('express');
const router = express.Router();

/* GET editor page. */
router.get("/", (req, res, next) => {
  res.render("codeEditor", { result: "결과는 요기에" });
});

module.exports = router;
