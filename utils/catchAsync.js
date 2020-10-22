module.exports = (fn) => {
  return (req, res, next) => {
    console.log(2)
    fn(req, res, next).catch(err => {
      console.log(3)
      next(err)
    });
  };
};
