const express = require('express');

const router = express.Router();

const athenticate = require('../middleware/athenticate');

router.get('/', athenticate(), (req, res, next) => {
  console.log(req.authInfo);

  res.redirect('/problems');
});

module.exports = router;
