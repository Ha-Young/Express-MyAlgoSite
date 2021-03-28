require("dotenv").config();

require(`${__dirname}/../../database/loader`);

const uploadAndRenameFile
  = require(`${__dirname}/../../middlewares/uploadAndRenameFile`);

const Problem = require(`${__dirname}/../../models/Problem`);

exports.uploadProblems = uploadAndRenameFile("problems", Problem);
