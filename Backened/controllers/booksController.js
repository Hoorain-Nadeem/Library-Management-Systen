let bookModel = require("../models/booksModel");


let bookInsert = async (req, res) => {
  try {
    let { title, author, category, ISBN, quantity, publicationYear } = req.body;

    let book = await bookModel.findOne({ ISBN: ISBN });

    if (book) {
      return res.send({
        status: false,
        message: "ISBN already exists",
      });
    }

    // Create book
    let insertObj = new bookModel({
      title,
      author,
      category,
      ISBN,
      quantity,
      availableQuantity: quantity,
      publicationYear,
    });

    await insertObj.save();

    res.send({
      status: true,
      message: "Book inserted successfully",
    });
  } catch (err) {
    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

let bookList = async (req, res) => {
  let bookList = await bookModel.find();
  res.send({
    status: 1,
    bookList,
  });
};

let bookDel = async (req, res) => {
  try {
    let { ISBN } = req.params;

    let book = await bookModel.findOne({ ISBN });

    if (!book) {
      return res.status(404).send({
        status: false,
        message: "Book not found",
      });
    }

    if (book.availableQuantity !== book.quantity) {
      return res.status(400).send({
        status: false,
        message: "Cannot delete a book while copies are borrowed",
      });
    }

    await bookModel.deleteOne({ ISBN });

    res.send({
      status: 1,
      message: "Book deleted successfully",
    });

  } catch (err) {
    console.log(err);

    res.status(500).send({
      status: 0,
      message: "Something went wrong",
      error: err.message,
    });
  }
};

let bookEdit = async (req, res) => {
  try {
    let { ISBN } = req.params;

    let { title, author, category, quantity, publicationYear } = req.body;

    let updateObj = {
      title,
      author,
      category,
      quantity,
      publicationYear,
    };

    let bookUpdate = await bookModel.updateOne({ ISBN: ISBN }, updateObj);

    res.send({
      status: true,
      message: "Book is updated",
      bookUpdate,
    });
  } catch (err) {
    console.log(err);

    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: err.message,
    });
  }
};
let getBookById = async (req, res) => {
  try {
    let { id } = req.params;

    let myBook = await bookModel.findById(id);

    if (!myBook) {
      return res.status(404).send({
        status: false,
        message: "Book not found",
      });
    }

    res.send({
      status: true,
      myBook,
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
let bookFilter = async (req, res) => {
  try {
    let { title, author, category, ISBN } = req.query;

    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }

    if (author) {
      filter.author = { $regex: author, $options: "i" };
    }

    if (category) {
      filter.category = { $regex: category, $options: "i" };
    }

    if (ISBN) {
      filter.ISBN = { $regex: ISBN, $options: "i" };
    }

    let books = await bookModel.find(filter);

    res.send({
      status: true,
      message: "Filtered books found",
      bookList: books,
    });

  } catch (error) {
    console.log("FILTER ERROR:", error);

    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
module.exports = { bookInsert, bookList, bookDel, bookEdit ,getBookById,bookFilter};
