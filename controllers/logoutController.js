exports.logout = (req, res) => {
  req.session.destroy((err) => {

    req.logout()
    res.redirect("/")
  });
};
