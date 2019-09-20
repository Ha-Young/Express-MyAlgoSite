const router = require('express').Router();
const vm = require('vm');
const authCheck = require('./middlewares/checkAuth');
const Problem = require('../models/Problem');

router.get('/:problem_id', authCheck, async (req, res, next) => {
  try {
    const problem = await Problem.findOne({ _id: req.params.problem_id });
    res.render('problems', {
      title: 'Vanilla',
      user: req.user,
      problem: problem
    });
  } catch(err) {
    res.status(400).send({ error: 'invalid Problem id' });
  }
});

router.post('/:problem_id', authCheck, async (req, res, next) => {
  try {
    const problem = await Problem.findOne({ _id: req.params.problem_id });

    try {
      problem.tests.map(test => {
        const script = new vm.Script(req.body.solution + test.code);
        const result = script.runInContext(vm.createContext({}, { timeout: 3000 }));
        if (result !== test.solution) {
          return res.render('failure', {
            title: 'Vanilla',
            user: req.user,
            error: '실행 결과값이 틀립니다.',
            id: req.params.problem_id
          });
        }
      });
      res.render('success', { title: 'Vanilla', user: req.user, problem: problem });
    } catch(err) {
      return res.render('failure', {
        title: 'Vanilla',
        user: req.user,
        error: err,
        id: req.params.problem_id
      });
    }
  } catch(err) {
    next(err);
  }

});

module.exports = router;
