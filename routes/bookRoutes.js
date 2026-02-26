const express = require("express");
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

const protect = require("../middleware/authMiddleware");
const {
  validateCreateBook,
  validateUpdateBook,
} = require("../middleware/validateMiddleware");

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);

router.post("/", protect, validateCreateBook, createBook);
router.put("/:id", protect, validateUpdateBook, updateBook);
router.delete("/:id", protect, deleteBook);

module.exports = router;
