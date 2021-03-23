const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', async (req, res, next) => {
  const user = await req.user;
  res.render('index', { email: user.email });
});

module.exports = router;
