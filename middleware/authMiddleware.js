const jwt = require("jsonwebtoken");
const ApiResponse = require("../utils/apiResponse");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return ApiResponse.error(res, "Authorization token missing", 401);

  if (!authHeader.startsWith("Bearer "))
    return ApiResponse.error(res, "Invalid authorization format", 401);

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    return ApiResponse.error(res, "Invalid token", 401);
  }
};

module.exports = protect;