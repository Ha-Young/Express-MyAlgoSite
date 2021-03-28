const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.locals.user = req.user;
  res.render('index');
});

module.exports = router;
