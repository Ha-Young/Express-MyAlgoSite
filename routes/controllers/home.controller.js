import createError from 'http-errors';
import Problem from '../../models/Problem';

export const renderHome = async (req, res, next) => {
  try {
    const problems = await Problem.find();
    res.render('home', { problems });
  } catch (e) {
    next(createError(500));
  }
};

export const renderLogin = (req, res) => {
  res.render('login', { title: 'login' });
};

export const logout = (req, res) => {
  req.logout();
  req.session.destroy();

  res.redirect(302, '/login');
};
