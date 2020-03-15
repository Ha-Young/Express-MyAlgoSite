const express = require('express');
const mongoose = require('mongoose');

const errors = require('../../helpers/error');
const Problem = require('../../models/Problem');

const vm = require('vm');
const _ = require('lodash');

exports.codeGrading = async (req, res, next) => {
  const { problem_id: id } = req.params;
  const { codeInput } = req.body;
  const testResults = [];
  let passCount = 0;

  try {
    const problem = await Problem.findOneAndUpdate({ id }, {
      attemptedCode: codeInput,
      attemptedAt: Date.now()
    }, { new: true }).lean();

    await problem.tests.forEach(test => {
      const { exampleCode, solution } = test;
      const code = vm.runInThisContext(`${codeInput} ${exampleCode}`);

      if (_.isEqual(code, solution)) {
        testResults.push({
          isPassed: '✔',
          exampleCode,
          solution
        })
        passCount++;
      } else {
        testResults.push({
          isPassed: '❌',
          exampleCode,
          solution,
          code,
        });
      }
    })

  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      return next(new errors.GeneralError(error));
    } else {
      return next(new errors.ValidationError(error));
    }
  }

  if (passCount === problem.tests.length) {
    res.render('result', {
      message: 'Good job!',
      testResults: null,
      passCount,
      id,

    });
  } else {
    res.render('result', {
      message: 'Need improvement..',
      testResults,
      passCount,
      id,
    });
  }
}