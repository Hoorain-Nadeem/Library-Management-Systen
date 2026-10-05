const userModal = require("../models/userModel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const memberModel = require("../models/memberModel");

// let register = async (req, res) => {
//   let { name, email, password, role, phone, address } = req.body;
//   let checkUser = await userModal.findOne({ email });
//   if (checkUser) {
//     return res.send({
//       status: false,
//       message: "User already exist",
//     });
//   }
//   let hassPass = await bcrypt.hash(password, 10);
//   let insertObj = new userModal({
//     name,
//     email,
//     password: hassPass,
//     role,
//   });
//   let savedUser = await insertObj.save()
//   const member = new memberModel({
//     userId: savedUser._id,
//     name,
//     email,
//     phone,
//     address,
//   });

//   await member.save()
//     res.send({
//       status: true,
//       message: "User register and member successfully",
//     });
//   }

let register = async (req, res) => {
  try {
    let { name, email, password, role, phone, address } = req.body;

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).send({
        status: false,
        message: "Name, email and password are required",
      });
    }

    // Check existing user
    let checkUser = await userModal.findOne({ email });

    if (checkUser) {
      return res.status(400).send({
        status: false,
        message: "User already exists",
      });
    }

    // Hash password
    let hassPass = await bcrypt.hash(password, 10);

    // Create user
    let insertObj = new userModal({
      name,
      email,
      password: hassPass,
      role: role || "user",
    });

    let savedUser = await insertObj.save();

    // Create member
    let member = new memberModel({
      userId: savedUser._id,
      name,
      email,
      phone,
      address,
    });

    await member.save();

    return res.status(201).send({
      status: true,
      message: "User registered and member created successfully",
    });

  } catch (error) {
    console.log("REGISTER ERROR:", error);

    return res.status(500).send({
      status: false,
      message: "Something went wrong while registering user",
      error: error.message,
    });
  }
};


let login = async (req, res) => {
  let { email, password, role } = req.body;
  let User = await userModal.findOne({ email });

  if (!User) {
    return res.send({
      status: false,
      message: "Incorrect email or password",
    });
  }
  let checkPass = await bcrypt.compare(password, User.password);
  if (checkPass) {
    let token = jwt.sign(
      { id: User._id, role: User.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "24h",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.send({
      status: true,
      message: `You are logged in as a ${role}`,
      user: {
        id: User._id,
        name: User.name,
        email: User.email,
        role: User.role,
      },
    });
  } else {
    res.send({
      status: false,
      message: "incorrect email or password",
    });
  }
};
let logout = (req, res) => {
  res.clearCookie("token");
  return res.send("logout");
};
let profile = (req, res) => {
  res.send(req.user);
};
module.exports = { register, login, logout, profile };
