exports.renderLoginPage = function (req, res, next) {
  res.status(200).render("login", { title: "this is Login page" });
};
