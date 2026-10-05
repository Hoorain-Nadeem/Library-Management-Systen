let express = require('express')
const { register, login, logout, profile } = require('../controllers/userController')
const profileMiddleware = require('../middleware/profileMiddleware')
let userRouter = express.Router()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.post("/logout",logout)
userRouter.post("/profile",profileMiddleware,profile)
module.exports = userRouter