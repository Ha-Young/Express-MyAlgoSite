const bcrypt = require("bcrypt");
const passport = require("passport");


function renderLogin(req, res, next) {
  res.render("login", { title: "login" });
}

function renderRegister(req, res, next) {
  res.render("register", { title: "register" });
}

const authenticate = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true,
});


async function register(req, res, next) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    const newUser = new User({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    await newUser.save();
    res.redirect("/auth/login");
  } catch (err) {
    res.redirect("/auth/login/register");
  }
}

exports.renderLogin = renderLogin;
exports.renderRegister = renderRegister;
exports.authenticate = authenticate;
exports.register = register;