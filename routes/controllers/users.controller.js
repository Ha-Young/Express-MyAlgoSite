const User = require("../../models/User");
const Problem = require("../../models/Problem");
const shortid = require("shortid");
const bcrypt = require("bcrypt");

exports.getAll = async function(req, res, next) {
  var feedback = "";
  res.render("register", { error: feedback });
};

exports.create = async function(req, res, next) {
  if (req.body.password !== req.body.password2) {
    var fmsg = req.flash("error", "Password must same!");
    var feedback = fmsg.error[0];
    res.render("register", { error: feedback });
  } else {
    const hash = await bcrypt.hash(req.body.password, 10);
    var problem = await Problem.find();
    var totalProblemState = [];
    for (var i = 0; i < problem.length; i++) {
      var oneProblemState = {
        id: problem[i].id,
        title: problem[i].title,
        completed: false
      };
      totalProblemState.push(oneProblemState);
    }
    await User.create({
      id: shortid.generate(),
      userName: req.body.username,
      pwd: hash,
      displayName: req.body.displayname,
      problem: totalProblemState
    });
    return res.redirect("/login");
  }
};
