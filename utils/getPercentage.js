function getPercentage (passed, failed) {
  if (!passed) {
      return 0;
  }

  return Math.floor(100 * passed / (passed + failed));
}

exports.getPercentage = getPercentage;