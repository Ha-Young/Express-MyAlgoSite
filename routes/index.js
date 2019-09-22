const express = require('express');
const router = express.Router();
const authenticateUser = require('./middlewares/authenticateUser');
const { getProblemList } = require('./controllers/problem.controller');
const {
  getLoginPage,
  gitHubLogin,
  gitHubLoginCallback,
  doLogout
} = require('./controllers/authorization');

router.get('/', authenticateUser, getProblemList);
router.get('/login', getLoginPage);
router.get('/login/github', gitHubLogin);
router.get('/login/github/callback', gitHubLoginCallback);
router.get('/logout', doLogout);

module.exports = router;
