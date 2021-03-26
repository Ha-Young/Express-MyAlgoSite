require("dotenv").config();

const { ROOT_PATH }
  = require(`${__dirname}/../../constants/constants`);

require(`${ROOT_PATH}/database/atlas`);

const uploadAndRenameFile
  = require(`${ROOT_PATH}/middlewares/uploadAndRenameFile`);

const Problem = require(`${ROOT_PATH}/models/Problem`);

exports.uploadProblems = uploadAndRenameFile("problems", Problem);
