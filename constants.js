exports.ROUTERS = {
  HOME: '/',
  AUTH: '/auth',
  PROBLEMS: '/problems'
};

exports.ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  LOGOUT: '/logout',
  GITHUB_CALLBACK: '/github/callback',
  PROBLEM: '/:problem_id',
  REDIRECT_LOGIN: '/auth/login'
};

exports.VIEWS = {
  HOME: 'index',
  SUCCESS: 'success',
  FAILURE: 'failure',
  PROBLEM: 'problem',
  LOGIN: 'login'
};

exports.TEST = {
  SUCCEED: 'succeed',
  FAILED: 'failed',
  EXECUTION_ERROR: 'execution-error'
};
