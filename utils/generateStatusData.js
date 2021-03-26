/**
 * generate status data on authentication status to render ejs files
 * @param {boolean} isAuthenticated - boolean value to determin the authentication status
 * @param {object} user - user Object that contains data
 * @return {Object} return status data
 */
const generateStatusData = (isAuthenticated, user) => {
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
    loginRef: '/auth/login'
  };
};

module.exports = generateStatusData;
