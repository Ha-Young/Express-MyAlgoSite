const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('success', {
    user: req.user.username
  });
});

module.exports = router;
