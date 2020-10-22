const express = require('express');
const router = express.Router();
const { validateUser } = require('./middlewares/userValidation');
const {
  getAll,
  getOne,
  submitCode,
} = require('./controllers/problems.controller');

router.get('/:problemNumber', validateUser, getOne);
router.post('/:problemNumber', validateUser, submitCode);

module.exports = router;
