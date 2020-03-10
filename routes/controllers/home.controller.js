import createError from 'http-errors';
import Problem from '../../models/Problem';

export const getHome = async (req, res, next) => {
  console.log(req.user, req.cookies, req.isAuthenticated());

  try {
    const problems = await Problem.find();
    res.render('home', { problems });
  } catch (e) {
    next(createError(400));
  }
};

export const getLogin = (req, res) => {
  res.render('login', { title: 'login' });
};

export const getLogout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect(302, '/login');
};
