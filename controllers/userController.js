const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return ApiResponse.error(res, "User already exists", 400);

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  return ApiResponse.success(
    res,
    "User registered",
    {
      id: user._id,
      name: user.name,
      email: user.email,
    },
    201,
  );
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return ApiResponse.error(res, "Invalid credentials", 401);

  const match = await bcrypt.compare(password, user.password);
  if (!match) return ApiResponse.error(res, "Invalid credentials", 401);

  return ApiResponse.success(res, "Login successful", {
    token: generateToken(user._id),
  });
});
