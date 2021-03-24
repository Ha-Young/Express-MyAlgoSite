const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problems.controller');
const { runCodeMirror } = require('../util/runCodeMirror');
const { authCheck } = require('../util/authCheck');

router.get('/', authCheck, problemsController.getAll);
router.get('/:problem_id', problemsController.getOne);
router.post('/result', runCodeMirror, problemsController.post);

module.exports = router;
