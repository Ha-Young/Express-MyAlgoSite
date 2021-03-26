const express = require('express');
const router = express.Router();
const forwardAuthenticated = require('./middlewares/forwardAuthenticated');
const problemsController = require('./controllers/problems.controller');

router.get('/:problems_id', forwardAuthenticated, problemsController.get);
router.post('/:problems_id', forwardAuthenticated, problemsController.post);
router.post('/:problems_id/restart', forwardAuthenticated, problemsController.restart);
router.get('/:problems_id/result', forwardAuthenticated, problemsController.getResult);
router.get('/:problems_id/codeError', forwardAuthenticated, problemsController.getCodeError);

module.exports = router;
