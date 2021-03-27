const mongoose = require("mongoose");
const createError = require("http-errors");

const ERROR_MESSAGE = require("../constants/errorConstants");

function handleError(errorStatus, error) {
  if (error instanceof mongoose.CastError) {
    console.log(ERROR_MESSAGE.MONGOOSE_ERROR);
    return createError(500, ERROR_MESSAGE.SERVER_ERROR);
  }

  switch (errorStatus) {
    case 404:
      return createError(404, ERROR_MESSAGE.NOT_FOUND);

    case 500:
      return createError(500, ERROR_MESSAGE.SERVER_ERROR);

    default:
      return createError(500, ERROR_MESSAGE.SERVER_ERROR);
  }
}

module.exports = handleError;
