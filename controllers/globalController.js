exports.home = (req, res, next) => {
  res.render('index', { title: '바닐라코딩' });
};
