const express = require('express');
const router = express.Router();
const { ensureAuthenticated, checkTestResults } = require('./middlewares');
const problemController = require('./controllers/problem.controller');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));

router.get('/:problem_id',
  ensureAuthenticated,
  problemController.getTargetProblem,
  (req, res, next) => {
    res.render('problem', { problem: req.problem });
  }
);

router.post('/:problem_id',
  ensureAuthenticated,
  problemController.getTargetProblem,
  checkTestResults
);

module.exports = router;
