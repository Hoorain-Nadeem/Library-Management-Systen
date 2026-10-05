const express = require("express");

const router = express.Router();

const {
  borrowBook,
  returnBook,
  getMyBooks,
} = require("../controllers/borrowController");

const authMiddleware = require("../middleware/profileMiddleware");

router.post(
  "/borrow",
  authMiddleware,
  borrowBook
);
router.put(
  "/return/:borrowId",
  authMiddleware,
  returnBook
);
router.get(
  "/my-books",
  authMiddleware,
  getMyBooks
);
module.exports = router;