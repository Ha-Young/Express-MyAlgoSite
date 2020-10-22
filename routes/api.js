/* TEST ROUTER: WILL BE DELETED SOON */

const express = require('express');

const User = require('../models/User');
const Problem = require('../models/Problem');

const router = express.Router();

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

router.post('/test', async (req, res, next) => {
  const { body } = req;
  res.status(200).send({ result: 'ok', content: body });
});

module.exports = router;
