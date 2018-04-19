const mongooseLoader = require('./mongoose');

module.exports = async function () {
  const mongoConnection = await mongooseLoader();
};
