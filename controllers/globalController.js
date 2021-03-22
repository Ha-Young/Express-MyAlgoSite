const { TITLE } = require("../constants/common");

exports.home = (req, res) => {
  res.render("home", { title: TITLE.HOME });
};

exports.login = (req, res) => {
  res.render("login", { title: TITLE.LOGIN });
};

exports.join = (req, res) => {
  res.render("join", { title: TITLE.JOIN });
};
