import passport from 'passport';

export const githubLogin = passport.authenticate('github');

export const githubLoginCallback = passport.authenticate('github', {
  failureRedirect: '/login'
});
