let express = require('express')
// const { register, login, logout, profile } = require('../controllers/userController')
const profileMiddleware = require('../middleware/profileMiddleware')
const { bookInsert, bookDel, bookEdit, bookList, getBookById, bookFilter } = require('../controllers/booksController')
let bookRouter = express.Router()

bookRouter.post("/create",bookInsert)
bookRouter.delete("/del/:ISBN",bookDel)
bookRouter.put("/edit/:ISBN",bookEdit)
bookRouter.get("/all",bookList)
bookRouter.get("/filter",bookFilter)
bookRouter.get("/my-books/:id",getBookById)
module.exports = bookRouter
