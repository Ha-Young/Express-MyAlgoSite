const User = require('../../models/User');

// exports.getAll = async function(req, res, next) {
//   try {
//     const allUsers = await User.find();
//     res.status(200).json({ result: 'ok', users: allUsers });
//   } catch (err) {
//     next(err);
//   }
// };

exports.create = async function(req, res, next) {
  if (!req.body.email || !req.body.password) {
    // next(someCustomError);

    return;
  }

  const userDate = {
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const newUser = User.create(userDate);
    res.status(201).json({ result: 'ok', user: newUser });
  } catch (err) {
    next(err);
  }
};
