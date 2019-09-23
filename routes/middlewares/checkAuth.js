// const authCheck = (req, res, next) => {
//   if (!req.user) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// };

const authCheck = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(301).redirect('/login');
  }
  next();
};

module.exports = authCheck;

// exports.authCheck = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     next();
//   }
//   res.status(301).redirect('/login');
// };
