const express = require('express');
const router = express.Router();
const {
  getAll,
  getOne,
  submitCode,
} = require('./controllers/problems.controller');

router.get('/', getAll);
router.get('/:problemNumber', getOne);
router.post('/:problemNumber', submitCode);

module.exports = router;
