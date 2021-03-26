const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");

const Problem = require("../../models/Problem");

exports.renderProblemsPage = async function (req, res, next) {
  try {
    const fetchedProblems = await Problem.find({});
    res.status(200).render("problems", { problems: fetchedProblems });
  } catch (error) {
    const createdError = createError(500, errorMessage.SERVER_ERROR);
    return next(createdError);
  }
};
