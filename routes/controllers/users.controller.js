const User = require("../../models/User");
const createError = require("http-errors");

exports.signUp = async (req, res, next) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).render("success", { message: "May the CODE be with you" });
  } catch (err) {
    if (err.code === 11000) {
      switch (Object.keys(err.keyValue)[0]) {
        case "userId":
          req.flash("validation", "duplicate ID");
          break;
        case "userNickname":
          req.flash("validation", "duplicate nickname");
          break;
        case "userEmail":
          req.flash("validation", "duplicate email");
          break;
        default :
          break;
      }

      res.redirect("/users/signup");
      return;
    }

    next(createError(500, "Internal Server Error"));
  }
};
