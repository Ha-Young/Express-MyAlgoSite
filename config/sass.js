const path = require('path');

const sassConfig = {
  src: path.join(__dirname, '..', 'assets'),
  dest: path.join(__dirname, '..', 'public'),
  indentedSyntax: false,
  outputStyle: 'compressed',
};

module.exports = sassConfig;
