const express = require('express');
const router = express.Router();
const authsController = require('./controllers/auths.controller');

router.get(
  '/google',
  authsController.fetchGoogleAccessToken
);

router.get(
  '/google/callback',
  authsController.fetchGoogleUser
);

router.get('/logout', authsController.logout);

module.exports = router;
