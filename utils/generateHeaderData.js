/**
 * Used to render header.ejs file based on authentication status
 * @param {boolean} isAuthenticated - boolean value to determin the authentication status
 * @param {object} user - user Object that contains data
 * @return {Object} return header data to render header.ejs
 */
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
