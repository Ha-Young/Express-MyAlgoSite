const express = require('express');
const router = express.Router();
const Problem = require('../models/Problem');
const { VM } = require('vm2');
const vm = new VM();

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};

router.get('/:problem_id', authenticateUser, (req, res, next) => {
  Problem.findOne({ id: req.params.problem_id }, function(err, problem) {
    res.render('problems',
      { title: problem.title,
        completed_users: problem.completed_users || 0,
        difficulty_level: problem.difficulty_level,
        description: problem.description,
        id: problem.id
      }
    );
  });
});

router.post('/:problem_id', authenticateUser, async function(req, res, next) {
  res.status(201);
  var code = req.body.solution;
  var fn = new Function(code);

  try {
    const code = req.body.code;
    const fn = new Function(code);
    const script = new vm.Script(fn);
    const result = []
    vm.createContext(script);
    for(var i=0; i<script.length; i++) {
      script.runInContext(script);
    }

    await Problem.findOne({ id: req.params.problem_id }, function(err, problem) {
      const test = problem.tests;
      res.json({ test });
    })

  } catch (error) {
    next(error);
  }
});

module.exports = router;