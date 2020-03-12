const router = require("express").Router();

router.get("/:id", (req, res) => {

  // 
  res.end(" show problem ");
});

module.exports = router;
