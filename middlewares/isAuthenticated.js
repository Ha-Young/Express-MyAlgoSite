exports.isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    console.log('인증된 상태입니다!');
    return next();
  }

  console.log('여기로 요청이 온건데!', req.path);
  console.log('req.isAuthenticated => ', req.isAuthenticated());
  console.log('인증이 필요합니다!');
  return res.redirect('/auth/login');
};
