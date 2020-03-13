const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    req.session.destroy();
    res.redirect('/login');
  } catch (err) {
    err.status = 500;
    next(err);
  }
});

module.exports = router;
