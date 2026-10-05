let express = require("express");
let mongoose = require("mongoose");
let cookieParser = require('cookie-parser')
let cors = require("cors");
const userRouter = require("./routes/userRoute");
const bookRouter = require("./routes/bookRoute");
const memberRouter = require("./routes/member");
const borrowRoutes = require("./routes/borrowRoute");
let app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors({
   origin: "http://localhost:5173",
  credentials:true
}));
require("dotenv").config();

//MONGOOSE CONNECTION
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("db is connected");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports=app

app.use('/api/user',userRouter)
app.use('/api/book',bookRouter)
app.use('/api/member',memberRouter)


app.use("/api/borrow", borrowRoutes);
