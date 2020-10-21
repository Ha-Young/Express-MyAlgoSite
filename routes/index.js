const express = require('express');
const verifyUser = require('./middlewares/authorization').verifyUser;

const User = require('../models/User');
const Problem = require('../models/Problem');

const router = express.Router();

router.get('/', verifyUser, async (req, res, next) => {
  const { query: { filter }, user } = req;
  const options = {};
  if (filter) options.difficulty_level = filter;
  try {
    const list = await Problem.find(options).lean().exec();
    res.render('index', { title: 'Codewars', user: user.display_name, list });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

// API TEST =================================

router.post('/', async (req, res, next) => {
  const { body } = req;
  try {
    await User.create(body);
    res.status(201).send('Created!');
  } catch (error) {
    next(error);
  }
});

router.post('/pro', async (req, res, next) => {
  const { body } = req;
  try {
    await Problem.create(body);
    res.status(201).send('Created!');
  } catch (error) {
    next(error);
  }
});

// ===========================================