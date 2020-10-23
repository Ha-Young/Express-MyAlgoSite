function logOut(req, res, next) {
  try {
    if (req.isAuthenticated()) {
      req.logout();
      next();
      return;
    }
  } catch (err) {
    res.render('error', {
      errorDescription: '로그인 에러',
      errorStatus: 500,
      errorMessage: 'Internal Server Error'
    });
  }
}

module.exports = logOut;
