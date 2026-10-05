let express = require('express')
// const { register, login, logout, profile } = require('../controllers/userController')
const profileMiddleware = require('../middleware/profileMiddleware')
const { bookInsert, bookDel, bookEdit, bookList, getBookById, bookFilter } = require('../controllers/booksController')
let bookRouter = express.Router()

bookRouter.post("/create",profileMiddleware,bookInsert)
bookRouter.post("/del/:ISBN",profileMiddleware,bookDel)
bookRouter.post("/edit/:ISBN",bookEdit)
bookRouter.get("/all",profileMiddleware,bookList)
bookRouter.get("/filter",profileMiddleware,bookFilter)
bookRouter.get("/my-books/:id",profileMiddleware,getBookById)
module.exports = bookRouter