const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const vm = require('vm');
const { isLoggedIn } = require('./middlewares');

const Problem = require('../models/Problem');

router.get('/:id', isLoggedIn, async (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next();
  }

  try {
    const problem = await Problem.findOne({_id: req.params.id});
    res.render('problem', {
      problem
    });
  } catch (error) {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
  }
});

router.post('/:id', async (req, res, next) => {
  let success = 0;
  const failure = [];

  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next();
  }

  try {
    const problem = await Problem.findOne({_id: req.params.id});

    problem.tests.forEach((item, index) => {
      try {
        var code = `${req.body.contents} ${item.code}`;
        const script = new vm.Script(code);
        const context = vm.createContext({});
        const result = script.runInContext(context, { timeout: 1000 });

        if (result === item.solution) {
          success++;
        } else {
          failure.push(`테스트 ${index}의 실행결과: Expected '${item.solution}' to be '${result}'.`);
        }
      } catch(err) {
        return res.render('failure', {
          err,
          failure,
          id: req.params.id
        });
      }
    });

    if (success === problem.tests.length) {
      res.render('success', {
        message: `축하합니다. 테스트케이스 ${problem.tests.length}개 모두 통과하셨습니다.`
      });
    } else {
      res.render('failure', {
        err: false,
        failure,
        id: req.params.id
      });
    }
  } catch (error) {
    const err = new Error('Internal Server Error');
    err.status = 500;
    next(err);
  }
});

module.exports = router;
