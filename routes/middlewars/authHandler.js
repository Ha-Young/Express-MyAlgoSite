const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require("dotenv");
dotenv.config();

exports.create = function (req, res) {
  passport.authenticate("local", { session: false }, (err, user) => {
    if (err) {
      return res.status(400).send("err in authenticate");
    }

    if (!user) {
      return res.status(400).send("no user");
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // jwt.sign('token내용', 'JWT secretkey')
      const token = jwt.sign(user.toJSON(), process.env.JWT_SECRET);
      return res.json({ user, token });
    });
  })(req, res);
};
