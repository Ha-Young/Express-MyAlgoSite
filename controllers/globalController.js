const { TITLE } = require("../constants/common");

exports.home = (req, res) => {
  res.render("home", { title: TITLE.HOME });
};

exports.getLogin = (req, res) => {
  res.render("login", { title: TITLE.LOGIN });
};

exports.postLogin = (req, res) => {
  const { id, password } = req.body;
};

exports.join = (req, res) => {
  res.render("join", { title: TITLE.JOIN });
};
