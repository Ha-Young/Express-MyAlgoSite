const Problem = require('../../models/Problem');
const { SUCCESS } = require('../../constants/index');

async function updateDb(req, res, next) {
  console.log(req.params);
  const problemData = await Problem.findOne(req.params);

  if (
    !problemData.completed_users
      .includes(req.user._id)
  ) {
    problemData.completed_users.push(req.user._id);
    problemData.completed_user_number++;

    try {
      await Problem.findOneAndUpdate(
        req.params,
        problemData,
        { new: true }
      );
    } catch (err) {
      next(err);
    }
  }

  res.status(200).render(SUCCESS);
}

exports.updateDb = updateDb;
