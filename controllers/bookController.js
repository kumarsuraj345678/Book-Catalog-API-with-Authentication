const Book = require("../models/Book");
const ApiResponse = require("../utils/apiResponse");
const asyncHandler = require("../middleware/asyncHandler");

exports.createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  return ApiResponse.success(res, "Book created", book, 201);
});

exports.getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find();
  return ApiResponse.success(res, "Books fetched", books);
});

exports.getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (!book) return ApiResponse.error(res, "Book not found", 404);

  return ApiResponse.success(res, "Book fetched", book);
});

exports.updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!book) return ApiResponse.error(res, "Book not found", 404);

  return ApiResponse.success(res, "Book updated", book);
});

exports.deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) return ApiResponse.error(res, "Book not found", 404);

  return ApiResponse.success(res, "Book deleted");
});
