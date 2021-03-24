function runCodeMirror(req, res, next) {
  const code = req.body.code;
  const regex = /(?<=\().*?(?=\))/gi;
  const arguments = code.match(regex)[0].split(',');
  const startIndex = code.indexOf('{');
  const endIndex = code.lastIndexOf('}');
  const body = code.slice(startIndex + 1, endIndex);



  const result = new Function(arguments, body);
  console.log(result());
}

exports.runCodeMirror = runCodeMirror;
