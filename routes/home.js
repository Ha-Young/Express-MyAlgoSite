import express from 'express';
import checkLoggedIn from './middlewares/checkLoggedIn';
import * as homeCtrl from './controllers/home.controller';

const home = express.Router();

home.get('/', checkLoggedIn, homeCtrl.getHome);
home.get('/login', homeCtrl.getLogin);
home.get('/logout', checkLoggedIn, homeCtrl.getLogout);

export default home;
