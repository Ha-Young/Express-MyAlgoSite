const User = require("../../models/User");
const createError = require("http-errors");

exports.signUp = async (req, res, next) => {
  console.log(req.body);
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).render("success", { message: "May the CODE be with you" });
  } catch (err) {
    if (err.code === 11000) {
      switch (Object.keys(err.keyValue)[0]) {
        case "id":
          req.flash("validation", "duplicate ID");
          break;
        case "nickname":
          req.flash("validation", "duplicate nickname");
          break;
        case "email":
          req.flash("validation", "duplicate email");
          break;
        default :
          break;
      }

      res.status(422).redirect("/users/signup");
      return;
    }
    next(createError(500, "Internal Server"));
  }
};
