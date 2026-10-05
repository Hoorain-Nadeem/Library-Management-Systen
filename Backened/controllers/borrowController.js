const borrowModel = require("../models/borrowModel");
const bookModel = require("../models/booksModel");

const borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;

    // Logged-in user
    const userId = req.user._id;

    // Check book
    const book = await bookModel.findById(bookId);

    if (!book) {
      return res.status(404).send({
        status: false,
        message: "Book not found",
      });
    }

    // Check availability
    if (book.availableQuantity <= 0) {
      return res.status(400).send({
        status: false,
        message: "Book is currently unavailable",
      });
    }

    // Check whether user already has this book
    const alreadyBorrowed = await borrowModel.findOne({
      userId,
      bookId,
      status: "borrowed",
    });

    if (alreadyBorrowed) {
      return res.status(400).send({
        status: false,
        message: "You have already borrowed this book",
      });
    }

    // Due date = 14 days from now
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14);

    // Create borrow record
    const borrow = new borrowModel({
      userId,
      bookId,
      dueDate,
    });

    await borrow.save();

    // Decrease available quantity
    book.availableQuantity -= 1;

    await book.save();

    res.status(201).send({
      status: true,
      message: "Book borrowed successfully",
      borrow,
    });
  } catch (error) {
    console.log("BORROW ERROR:", error);

    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const returnBook = async (req, res) => {
  try {
    let { borrowId } = req.params;

    // Logged-in user
    let userId = req.user._id;

    // Find this borrow record
    let borrow = await borrowModel.findOne({
      _id: borrowId,
      userId: userId,
    });

    if (!borrow) {
      return res.status(404).send({
        status: false,
        message: "Borrow record not found",
      });
    }

    // Check if already returned
    if (borrow.status === "returned") {
      return res.status(400).send({
        status: false,
        message: "Book has already been returned",
      });
    }

    // Find the book
    let book = await bookModel.findById(borrow.bookId);

    if (!book) {
      return res.status(404).send({
        status: false,
        message: "Book not found",
      });
    }

    // Change borrow status
    borrow.status = "returned";
    borrow.returnDate = new Date();

    await borrow.save();

    // Increase available quantity
    book.availableQuantity += 1;

    await book.save();

    res.send({
      status: true,
      message: "Book returned successfully",
    });

  } catch (error) {
    console.log("RETURN BOOK ERROR:", error);

    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
const getMyBooks = async (req, res) => {
  try {
    const userId = req.user._id;

    const myBooks = await borrowModel
      .find({
        userId,
        status: "borrowed",
      })
      .populate("bookId");

    res.send({
      status: true,
      myBooks,
    });
  } catch (error) {
    console.log("MY BOOKS ERROR:", error);

    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
module.exports = {
  borrowBook,
  returnBook,
  getMyBooks
};