const ApiResponse = require("../utils/apiResponse");

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return ApiResponse.error(res, "All fields are required", 400);

  if (password.length < 6)
    return ApiResponse.error(res, "Password must be at least 6 characters", 400);

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password)
    return ApiResponse.error(res, "Email and password required", 400);

  next();
};

const validateBook = (req, res, next) => {
  const { title, author, genre, price } = req.body;

  if (!title || !author || !genre || price === undefined)
    return ApiResponse.error(res, "All book fields are required", 400);

  if (price < 0)
    return ApiResponse.error(res, "Price must be positive", 400);

  next();
};

module.exports = {
  validateRegister,
  validateLogin,
  validateBook
};