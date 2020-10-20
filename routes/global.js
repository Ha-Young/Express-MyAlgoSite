const express = require('express');
const router = express.Router();

const userController = require('./controllers/user');
const requiresLogin = require('./middlewares/requiresLogin');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'MAIN' });
});

router.get('/join', userController.getJoin);
router.post('/join', userController.postJoin, userController.postLogin);

router.get('/login', userController.getLogin);
router.post('/login', userController.postLogin);

router.get('/auth/github', userController.getGithubLogin);
router.get(
  '/auth/github/callback',
  userController.getGithubCallback,
  userController.postGithubLogin
);

router.get('/logout', requiresLogin, userController.getLogout);

module.exports = router;
