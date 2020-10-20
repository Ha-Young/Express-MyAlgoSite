/* eslint-disable no-unused-vars */
const Problem = require("../../models/Problem");

exports.getAll = async (req, res, next) => {
  const { avatar_url } = req.user._json;
  const username = req.user.username;

  // TODO: 에러 핸들링
  if (!avatar_url
    || !username
    || typeof avatar_url !== "string"
    || typeof username !== "string"
    ) {
    return res.status(204).json({ error: "no content" });
  }

  try {
    const problems = await Problem.find().lean();

    console.log(problems[0].id, "getAll id");

    res.render('problems', {
      problems: problems,
      username: username,
      avatar: avatar_url,
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  //FIXME: header 공통으로 설정해두면 avatar_url, username problem에 따로 전달 해 줄 필요 없음.
  const { avatar_url } = req.user._json;
  const username = req.user.username;
  const id = req.params.problem_id;

  if (!id || typeof id !== "string") {
    return res.status(204).json({ error: "no content" });
  }

  try {
    const problem = await Problem.findOne({ id });

    res.render('problem', {
      problem: problem,
      username: username,
      avatar: avatar_url,
    });
  } catch (err) {
    next(err);
  }

};

// exports.create = async function (req, res, next) {
//   const newProblem = req.body;

//   if (!newProblem || typeof newProblem !== "object") {
//     return res.status(400).json({ error: "bad request" });
//   }

//   try {
//     const problem = await Problem.create(newProblem);

//     console.log(problem)

//     res.status(201).json({
//       result: "ok",
//       problem: problem,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.update = async function (req, res, next) {
//   const newData = req.body;
//   const id = req.params.article_id;

//   if (!newData
//     || !id
//     || typeof newData !== "object"
//     || typeof id !== "string") {
//     return res.status(400).json({ error: "invalid article id" });
//   }

//   try {
//     const updatedArticle = await Problem.findByIdAndUpdate(id, newData, { new: true });

//     // "ok" 는 상수로 관리하는게 더 좋다.
//     res.json({ article: updatedArticle, result: 'ok' });
//   } catch (err) {
//     res.status(400).json({ error: "invalid article id" });
//   }
// };

// exports.delete = async function (req, res, next) {
//   const id = req.params.article_id;

//   if (!id || typeof id !== "string") {
//     return res.status(400).json({ error: "invalid article id" });
//   }

//   try {
//     await Problem.findByIdAndDelete(id);
//     res.json({ result: "ok" });
//   } catch (err) {
//     res.status(400).json({ error: "invalid article id" });
//   }
// };
