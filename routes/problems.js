const router = require('express').Router();
const vm = require('vm');
const authCheck = require('./middlewares/checkAuth');
const Problem = require('../models/Problem');

router.get('/:problem_id', authCheck, async (req, res, next) => {
  try {
    const problem = await Problem.findOne({ _id: req.params.problem_id });
    if (problem) {
      res.render('problems', {
        title: 'Vanilla',
        user: req.user,
        problem: problem
      });
    } else {
      res.status(400).send({ error: 'invalid Problem id' });
    }
  } catch(err) {
    res.status(500).send({ error: 'internal server error' });
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

/*

const solution = () => { return 2; };

*/
//
// const code = req.body.solution+ test.code;
// const script = new vm.Script(code);
// const context = vm.createdContext({});
// const answer = script.runInContext(context, {timeout: 100 });

//const script = new vm.Script(req.body.solution + problem.tests[0].code);
// const result = script.runInContext(vm.createContext({}));

// const sandbox = {};
// const code = req.body.solution + problem.tests[0].code;
// const script = new vm.Script(code);
// const context = vm.createContext(sandbox);
// console.log(script.runInContext(context));
