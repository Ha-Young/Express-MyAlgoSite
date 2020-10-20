/* eslint-disable no-unused-vars */
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_KEY;

function athenticate() {
  return (req, res, next) => {
    const token = req.cookies && req.cookies.loginToken;

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return res.redirect("/login");

      next();
    });
  };
}

module.exports = athenticate;
