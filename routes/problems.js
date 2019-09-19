const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');

router.get('/:problem_id',
  function (req, res, next) {
    Problem.findOne({ _id: req.params.problem_id}).then((problem) => {
      res.render('problem', { user: req.user, problem });
    })
  }
);

router.post('/:problem_id',
  function (req, res, next) {
    console.log(req.body.code);
  }
);

module.exports = router;
