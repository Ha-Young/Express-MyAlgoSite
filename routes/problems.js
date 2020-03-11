const express = require('express');
const router = express.Router();

router.get('/:problem_id', (req, res) => {
  console.log(req)

  // res.render('problem');
});

module.exports = router;
