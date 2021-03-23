const User = require("../models/User");

module.exports.joinController = function joinController(req, res, next) {
  res.render('join', { title: 'Sign Up' });
}

module.exports.postJoinController = async function postJoinController(req, res, next) {
  const {
    body: { email, password, name }
  } = req;

  try {
    const user = await User({
      email,
      name,
      password,
    });
    await User.create(user);
  } catch (err) {
    console.log(err);
    next(err);
  }

  next();
}
