const { TITLE } = require("../constants/common");

exports.home = (req, res) => {
  res.render("home", { pageTitle: TITLE.HOME });
};

exports.getLogin = (req, res) => {
  res.render("login", { pageTitle: TITLE.LOGIN });
};
exports.postLogin = (req, res) => {
  const { id, password } = req.body;
};

exports.logout = (req, res) => {
  res.redirect("/login");
}

exports.getJoin = (req, res) => {
  res.render("join", { pageTitle: TITLE.JOIN });
};
exports.postJoin = (req, res) => {
  res.redirect("/");
}
