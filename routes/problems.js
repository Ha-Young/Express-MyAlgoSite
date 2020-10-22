const express = require('express');
const router = express.Router();
const { validateUser } = require('./middlewares/userValidation');
const {
  getAll,
  getOne,
  submitHandler,
} = require('./controllers/problems.controller');

router.get('/:problem_number', validateUser, getOne);
router.post('/:problem_number', validateUser, submitHandler);

module.exports = router;
