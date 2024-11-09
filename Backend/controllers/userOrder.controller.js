import { User } from "../models/user.model.js";

const newOrder = async (req, res) => {
  try {
    const { itemsList, totalPrice, email } = req.body;
    // console.log("email:: ", email);
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const newObject = {
      items: itemsList,
      totalPrice: totalPrice,
    };
    findUser.orders.push(newObject);
    findUser.save();
    // console.log("itemsList:: ", itemsList);
    // console.log("totalPrice:: ", totalPrice);
    return res.status(200).json({ message: "New order created" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getOrders = async (req, res) => {
  try {
    const { email } = req.query;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res
      .status(200)
      .json({ message: "Orders fetched", orders: findUser.orders });
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export { newOrder, getOrders };
