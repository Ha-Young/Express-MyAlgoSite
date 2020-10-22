const checkAllPass = (el) => el;

const getCount = results => {
  let count = 0;

  results.filter(result => {
    if (result) count++;
  });

  return count;
};

module.exports = {
  checkAllPass,
  getCount,
};
