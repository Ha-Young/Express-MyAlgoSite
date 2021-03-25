const Problem = require('../models/Problem');

function runCodeMirror(req, res, next) {
  const code = req.body.code;

  const regex = /(?<=\().*?(?=\))/gi;
  const arguments = code.match(regex)[0].split(',');
  const startIndex = code.indexOf('{');
  const endIndex = code.lastIndexOf('}');
  const body = code.slice(startIndex + 1, endIndex);

  Problem.findOne({ id: req.body.problemId }).select('tests')
    .exec((err, data) => {
      if (err) {
        return next(err.message);
      }
      console.log(data)
    })

  req.body.solution = new Function(arguments, body);

  next();
}

exports.runCodeMirror = runCodeMirror;