const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  console.log(req.locals);

  res.render('failure', {
    user: req.user.username
  });
});

module.exports = router;
