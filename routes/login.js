const express = require('express');
const passport = require('passport');

const onGithubPassportAuth = require('./middlewares/githubAuth');

const router = express.Router();

router.get('/', (req, res) => res.render('login'));
router.get('/github', passport.authenticate('github'));
router.get('/github/callback', onGithubPassportAuth, (req, res) => res.redirect('/'));

module.exports = router;
