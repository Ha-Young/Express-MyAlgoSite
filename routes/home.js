import express from 'express';
import { checkLoggedIn } from './middlewares/auth';
import * as homeCtrl from './controllers/home.controller';

const home = express.Router();

home.get('/', checkLoggedIn, homeCtrl.renderHome);
home.get('/login', homeCtrl.renderLogin);
home.get('/logout', checkLoggedIn, homeCtrl.logout);

export default home;
