const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');
const { makeCodeMirrorToFunction } = require('../util/makeCodeMirrorToFunction');
const { authCheck } = require('../util/authCheck');

router.get('/', authCheck, problemsController.getAll);
router.get('/:problem_id', problemsController.getOne);
router.post('/result', makeCodeMirrorToFunction, problemsController.post);

module.exports = router;
