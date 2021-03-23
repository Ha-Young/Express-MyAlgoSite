const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

exports.signToken = function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) {
      return next("err in authenticate");
    }

    if (!user) {
      return next("Email or password incorrect"); // http error로 처리
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        return next("login error");
      }

      jwt.sign(
        user.toJSON(),
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            return next("jwt sign error");
          }
          return res
            .cookie("jwt", token, {
              httpOnly: true,
            })
            .status(200)
            .redirect("/problems");
        }
      );
    });
  })(req, res);
};
