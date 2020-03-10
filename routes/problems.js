import express from 'express';
import checkLoggedIn from './middlewares/checkLoggedIn';
import * as problemsCtrl from './controllers/problems.controller';

const problems = express.Router();

problems.get('/:problem_id', checkLoggedIn, problemsCtrl.getProblemById, problemsCtrl.renderProblem);
problems.post('/:problem_id', checkLoggedIn, problemsCtrl.getProblemById, problemsCtrl.confirmSolution);

export default problems;
