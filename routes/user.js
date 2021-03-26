const express = require('express');
const router = express.Router({ strict: true });
const usersController = require('./controllers/users.controller');

router.get(
  '/:user_id',
  usersController.getUser
);

router.get(
  '/submission/:submission_id',
  usersController.getSubmissionedCode
);

router.get(
  '/:user_id/:problem_id',
  usersController.getUserSubmissions
);

module.exports = router;
