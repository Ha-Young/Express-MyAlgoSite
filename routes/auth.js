import express from 'express';
import * as authCtrl from './controllers/auth.controller';

const auth = express.Router();

auth.get('/github', authCtrl.githubLogin);
auth.get('/github/callback', authCtrl.githubLoginCallback, (req, res) => {
  res.redirect(302, '/');
});

export default auth;
