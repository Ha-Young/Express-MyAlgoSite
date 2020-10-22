const express = require('express');
const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/logout', (req, res, next) => {
  req.logout();
  req.session.save(() => res.redirect('/'));
});

module.exports = router;
