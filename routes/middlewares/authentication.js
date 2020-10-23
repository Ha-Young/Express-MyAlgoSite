const bcrypt = require('bcrypt');
const { render } = require('ejs');
const User = require('../../models/User');

async function authenticate(
  {
    body: { email, password },
    session,
    url,
  },
  res,
  next,
) {
  if (!email.includes('@')) {
    return res.render(url.split('/')[1], {
      notificationMessage: 'invalid email form',
      inputedEmail: email,
    });
  }

  let userData;
  try {
    userData = await User.find({ email });
  } catch (err) {
    return next({
      errorName: err.name || 'data fetch error in db',
      errorMessage: err.message,
      status: 500,
      reqUrl: `${url}`,
      location: 'authenticate middleware, try { allQuestions = await Problem.find({}); }',
      displayToUser: '죄송합니다. 내부적인 문제가 발생했습니다. 조금만 기다려주세요....',
    });
  }

  if (userData.length) {
    if (url === '/register') {
      return res.render('register', {
        notificationMessage: 'Email already exists',
        inputedEmail: email,
      });
    }

    let result;
    try {
      result = await bcrypt.compare(password, userData[0].password);
    } catch (err) {
      return next({
        errorName: err.name,
        errorMessage: err.message,
        status: 500,
        reqUrl: url,
        location: 'authenticate middleware, try { result = await bcrypt.compare(password, userData[0].password);',
        displayToUser: '죄송합니다. 내부적인 문제가 발생했습니다. 조금만 기다려주세요....',
      });
    }

    if (!result) {
      return res.render('login', {
        notificationMessage: 'Email or password is not valid',
        inputedEmail: email,
      });
    }

    session.userId = userData[0]._id;
    next();
  }

  if (url === '/login') {
    return res.render('login', {
      notificationMessage: 'Email or password is not valid',
      inputedEmail: email,
    });
  }

  return next();
}

exports.authenticate = authenticate;
