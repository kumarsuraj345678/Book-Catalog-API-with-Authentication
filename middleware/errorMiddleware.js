const ApiResponse = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  if (err.name === "CastError") {
    return ApiResponse.error(res, "Resource not found", 404);
  }

  console.error(err);

  return ApiResponse.error(res, "Internal Server Error", 500);
};

module.exports = errorHandler;