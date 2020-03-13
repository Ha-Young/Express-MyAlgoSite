const express = require('express');
const passport = require('passport');
const router = express.Router();

const middlewares = require('../middleware');
const Problem = require('../models/Problem');

router.get('/', middlewares.privatePage, async (req, res, next) => {
  try {
    const problemList = await Problem.find({});

    if (!problemList) {
      const error = new Error('일시적으로 문제를 들고오지 못했습니다. 잠시 후 다시 시도해주세요.');
      error.status = 503;
      throw error;
    }

    if (!problemList.length) {
      const error = new Error('현재 서버에 준비된 문제가 없습니다');
      error.status = 503;
      throw error;
    }

    res.render('index', { problemList });
  } catch (error) {
    next(error);
  }
});

router.get('/login', middlewares.publicPage, (req, res, next) => {
  res.render('login');
});

router.get('/logout', middlewares.privatePage, (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  res.redirect('/');
});

module.exports = router;
