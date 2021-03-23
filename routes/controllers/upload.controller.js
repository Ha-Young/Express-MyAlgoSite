require("dotenv").config();
require(`${__dirname}/../../database/atlas`);

const uploadAndRenameFile = require(`${__dirname}/../../utils/uploadAndRenameFile`);
console.log(uploadAndRenameFile);
const Problem = require(`${__dirname}/../../models/Problem`);

exports.uploadProblems = uploadAndRenameFile("problems", Problem);

exports.uploadProblems();
