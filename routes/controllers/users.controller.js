const User = require("../../models/User");

exports.signUp = async (req, res, next) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).render("success", { message: "가입이 완료되었습니다." });
  } catch (err) {
    if (err.code === 11000) {
      switch (Object.keys(err.keyValue)[0]) {
        case "userId":
          console.log("userId");
          req.flash("validation", "duplicate ID");
          break;
        case "userNickname":
          console.log("userNickname");
          req.flash("validation", "duplicate nickname");
          break;
        case "userEmail":
          console.log("userEmail");
          req.flash("validation", "duplicate email");
          break;
        default :
          break;
      }

      res.redirect("/users/signup");
      return;
    }

    next(err);
  }
};
