const express = require('express');
const router = express.Router();
const checkAuthentication = require('../middlewares/checkAuthentication');
const problemsController = require('../controllers/problems.controller');

router.use(checkAuthentication);

router
  .route('/:id')
  .get(problemsController.get)
  .post(problemsController.post);

module.exports = router;
