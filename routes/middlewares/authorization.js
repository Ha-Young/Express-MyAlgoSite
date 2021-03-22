const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const cookie = req.cookies;

  if (cookie.authcookie === undefined) {
    res.redirect("/users/login");
    return;
  }

  jwt.verify(cookie.authcookie, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      next(err);
      return;
    }

    next();
  });
}

exports.verifyToken = verifyToken;
