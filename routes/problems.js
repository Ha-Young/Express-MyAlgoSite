const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');

router.get('/', problemsController.getAll);
router.get('/:problemNumber', problemsController.getOne);

module.exports = router;
