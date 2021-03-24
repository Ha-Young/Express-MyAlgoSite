function runCodeMirror(req, res, next) {
  console.log('runcodemirror')
  const result = req.body.code.run();
  console.log(result);
}

exports.runCodeMirror = runCodeMirror;
