const generateHeaderData = (isAuthenticated, user) => {
  if (isAuthenticated) {
    return {
      user,
      signupStatus: '',
      loginStatus: 'logout',
      signupRef: '',
      loginRef: '/auth/logout',
    };
  }

  return {
    user: '',
    signupStatus: 'signup',
    loginStatus: 'login',
    signupRef: '/auth/signup',
    loginRef: '/auth'
  };
};

module.exports = generateHeaderData;
