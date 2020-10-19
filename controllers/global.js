exports.getHome = (req, res, next) => {
  res.render('index', { title: 'MAIN' });
};

exports.getJoin = (req, res, next) => {
  res.render('join', { title: 'JOIN' });
};
exports.postJoin = (req, res, next) => {
  res.render('join', { title: 'JOIN' });
};

exports.getLogin = (req, res, next) => {
  res.render('login', { title: 'LOGIN' });
};
exports.postLogin = (req, res, next) => {
  res.render('login', { title: 'LOGIN' });
};

exports.getLogout = (req, res, next) => {
  res.redirect('/');
};
