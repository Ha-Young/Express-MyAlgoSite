const dotenv = require("dotenv");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

dotenv.config();

exports.renderLoginPage = function (req, res, next) {
  res.status(200).render("logIn", { title: "this is Login page" });
};
