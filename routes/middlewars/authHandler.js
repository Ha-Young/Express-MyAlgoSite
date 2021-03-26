const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require("dotenv");
const createError = require("http-errors");

const errorMessage = require("../../constants/errorMessage");
dotenv.config();

exports.signToken = function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) {
      const createdError = createError(500, errorMessage.SERVER_ERROR);
      return next(createdError);
    }

    if (!user) {
      const createdError = createError(400, errorMessage.INCORRECT_AUTH);
      return next(createdError);
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        const createdError = createError(500, errorMessage.SERVER_ERROR);
        return next(createdError);
      }

      jwt.sign(
        user.toJSON(),
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1d" },
        (err, token) => {
          if (err) {
            const createdError = createError(500, errorMessage.SERVER_ERROR);
            return next(createdError);
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
