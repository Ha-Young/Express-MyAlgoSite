const { VM } = require('vm2');
const mongoose = require('mongoose');
const createError = require('http-errors');
const Problem = require('../models/Problem');
const constants = require('../../constants');
const vm = new VM({
  timeout: 2000,
});

exports.getProblem = async (req, res, next) => {
  try {
    const { params: { problem_id } } = req;
    const problem = await Problem.findOne({ _id: problem_id });

    res.render('problem', { problem: problem });
  } catch (err) {
    const isValidObjectId = mongoose.isValidObjectId(problem_id);

    if (!isValidObjectId) {
      next(createError(400, constants.ERROR_MESSAGE_INVALID_ID));
    }
    next(err);
  }
};

exports.submitAnswer = async (req, res, next) => {
  try {
    const { params: { problem_id }, body: { code } } = req;
    const { tests } = await Problem.findOne({ _id: problem_id });
    let result;
    let input;
    let output;
    let expect;

    try {
      result = tests
        .map(test => {
          let getResultTemplate;
          let outputTemplate = `
            ${vm.run(code)};
            ${test.code};
          `;
          if (typeof test.solution === 'string') {
            getResultTemplate = `
              ${vm.run(code)};
              ${test.code} === '${test.solution}';
            `;
          } else {
            getResultTemplate = `
              ${vm.run(code)};
              ${test.code} === ${test.solution};
            `;
          }

          if (!vm.run(getResultTemplate) && !input && !expect) {
            input = test.code;
            output = vm.run(outputTemplate);
            expect = test.solution;
          }
          return vm.run(getResultTemplate);
        })
        .every(result => result);
    } catch (err) {
      return res.render('failure', {
        error: err,
        problemId: problem_id,
      });
    }

    if (result) {
      res.render('success');
    } else {
      res.render('failure', {
        error: null,
        input,
        output,
        expect,
      });
    }
  } catch (err) {
    const isValidObjectId = mongoose.isValidObjectId(problem_id);

    if (!isValidObjectId) {
      next(createError(400, constants.ERROR_MESSAGE_INVALID_ID));
    }
    next(err);
  }
};
