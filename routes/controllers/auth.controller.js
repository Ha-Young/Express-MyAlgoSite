import passport from 'passport';

export const loginGithub = passport.authenticate('github');

export const loginGithubCallback = passport.authenticate('github', {
  failureRedirect: '/login',
  successRedirect: '/'
});
