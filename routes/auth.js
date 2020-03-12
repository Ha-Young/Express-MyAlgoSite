import express from 'express';
import * as authCtrl from './controllers/auth.controller';

const auth = express.Router();

auth.get('/github', authCtrl.loginGithub);
auth.get('/github/callback', authCtrl.loginGithubCallback);

export default auth;
