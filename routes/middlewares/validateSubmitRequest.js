const badRequestError = require('../../errors/badRequestError');

function validateSubmitRequest(req, res, next) {
  if (Object.keys(req.params)[0] !== 'number') {
    next(new badRequestError('bad request'));

    return;
  }

  next();
}

exports.validateSubmitRequest = validateSubmitRequest;
