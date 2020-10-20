const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).render('login', {
    id: `${process.env.CLIENT_ID_GITHUB}`,
    state: `${process.env.STATUS}`,
  });
});

router.get('/github');
router.get('/return');

module.exports = router;
