function makeCodeMirrorToFunction(req, res, next) {
  const code = req.body.code;

  const argumentsStart = code.indexOf('(');
  const argumentsEnd = code.indexOf(')');
  const arguments = code.slice(argumentsStart + 1, argumentsEnd);

  const bodyStartIndex = code.indexOf('{');
  const bodyEndIndex = code.lastIndexOf('}');
  const body = code.slice(bodyStartIndex + 1, bodyEndIndex);

  req.body.newFunction = new Function(arguments, body);
  next();
}

exports.makeCodeMirrorToFunction = makeCodeMirrorToFunction;
