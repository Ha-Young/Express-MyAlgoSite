const Problem = require('../models/Problem');

function runCodeMirror(req, res, next) {
  const code = req.body.code;
  const startParentheses = code.indexOf('(');
  const endParentheses = code.indexOf(')');
  const startIndex = code.indexOf('{');
  const endIndex = code.lastIndexOf('}');

  const arguments = code.slice(startParentheses + 1, endParentheses);
  const body = code.slice(startIndex + 1, endIndex);

  req.body.tests = [];
  req.body.newFunction = new Function(arguments, body);

  Problem.findOne({ id: req.body.problemId }).select('+tests')
    .exec((err, data) => {
      if (err) {
        return next(err.message);
      }

      data.tests.forEach(test => {
        const startParentheses = code.indexOf('(');
        const endParentheses = code.indexOf(')');
        const testArguments = code.slice(startParentheses + 1, endParentheses).split(',');

        req.body.tests.push({
          arguments: testArguments,
          solution: test.solution
        });
      });

      next();
    });
}

exports.runCodeMirror = runCodeMirror;
