let express = require('express')

const profileMiddleware = require('../middleware/profileMiddleware')
const { memberDel, memberEdit, memberList, memberUpgrade } = require('../controllers/memberController')

let memberRouter = express.Router()


memberRouter.post("/del/:userId",profileMiddleware,memberDel)
memberRouter.post("/edit/:userId",profileMiddleware,memberEdit)
memberRouter.get("/all",profileMiddleware,memberList)
memberRouter.post("/upgrade/:userId",profileMiddleware,memberUpgrade)
module.exports = memberRouter