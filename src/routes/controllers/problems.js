exports.viewProblem = function (req, res, next) {
  console.log('get problem');
  console.log(req.params);
  res.render("pages/problem");
};
