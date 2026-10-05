const memberModel = require("../models/memberModel");
const userModal = require("../models/userModel");

let memberList = async (req, res) => {
  try {
    let members = await memberModel
      .find()
      .populate("userId", "role");

    res.send({
      status: 1,
      memberList: members,
    });

  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: 0,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
let memberDel = async (req, res) => {
  try {
    let { userId } = req.params;

    let memberDel = await memberModel.deleteOne({
      userId
    });

    res.send({
      status: 1,
      message: "member deleted successfully",
      memberDel,
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

let memberEdit = async (req, res) => {
  
    let { userId } = req.params;

    let { name, email, phone, address } = req.body;

    let updateObj = {
      name,
      email,
      phone,
      address
    };

    let memberUpdate = await memberModel.updateOne(
      { userId: userId },
      updateObj
    )

      res.send({
      status: 1,
      message: "Member updated successfully",
      memberUpdate
    });
  


};
let memberUpgrade = async (req, res) => {
  try {
    let { userId } = req.params;

    // Find member using userId
    let member = await memberModel.findOne({ userId: userId });

    if (!member) {
      return res.status(404).send({
        status: false,
        message: "Member not found",
      });
    }

    // Find registered user using User _id
    let registeredUser = await userModal.findById(userId);

    if (!registeredUser) {
      return res.status(404).send({
        status: false,
        message: "Registered user not found",
      });
    }

    // Check if already librarian
    if (
      member.role === "librarian" &&
      registeredUser.role === "librarian"
    ) {
      return res.status(400).send({
        status: false,
        message: "Member is already a librarian",
      });
    }

    // Upgrade Member collection
    member.role = "librarian";
    await member.save();

    // Upgrade User collection
    registeredUser.role = "librarian";
    await registeredUser.save();

    res.send({
      status: true,
      message: "Member upgraded to librarian successfully",
    });

  } catch (error) {
    console.log("UPGRADE ERROR:", error);

    res.status(500).send({
      status: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};
module.exports={memberDel,memberEdit,memberList,memberUpgrade}