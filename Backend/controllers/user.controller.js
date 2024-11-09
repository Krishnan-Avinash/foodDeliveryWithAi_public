import { User } from "../models/user.model.js";

export const createUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email Not Received" });
  }
  try {
    const findUser = await User.findOne({ email });
    if (findUser) {
      return res
        .status(200)
        .json({ success: false, message: "User already exists" });
    }
    const newUser = await new User({ email });
    newUser.save();
    return res
      .status(200)
      .json({ success: true, message: "New User Added", user: newUser });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Some error occured" });
  }
};

export const updateUser = async (req, res) => {
  const { firstName, lastName, mobile, email, address, landmark, pincode } =
    req.body;
  if (!firstName || !lastName || !mobile || !email || !address || !pincode) {
    return res
      .status(400)
      .json({ success: false, message: "Necessary data not received" });
  }
  try {
    const findUser = await User.findOneAndUpdate(
      { email },
      {
        firstName,
        lastName,
        mobile,
        address,
        landmark: landmark ? landmark : "",
        pincode,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Account details updated",
      updatedDetails: findUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occured and the modification couldn't be done",
    });
  }
};

export const getUser = async (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res
      .status(400)
      .json({ success: false, message: "Email not received" });
  }
  try {
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res
        .status(500)
        .json({ success: false, message: "Couldn't find user" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "User found", foundUser: findUser });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Some error occured and the user couldn't be found",
    });
  }
};
