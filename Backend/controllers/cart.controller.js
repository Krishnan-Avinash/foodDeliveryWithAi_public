import { User } from "../models/user.model.js";

const addToCart = async (req, res) => {
  try {
    const { email, name, price } = req.body;

    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartToModify = userFound.cart;
    // console.log(cartToModify);

    let foundElementInCart = cartToModify.find((item) => item.name === name);
    // console.log("found element in cart:::", foundElementInCart);

    if (!foundElementInCart) {
      cartToModify.push({
        name: name,
        price: price,
        quantity: 1,
        totalPrice: price,
      });
    } else {
      foundElementInCart.quantity++;
      foundElementInCart.totalPrice =
        foundElementInCart.price * foundElementInCart.quantity;
      // console.log("after update: ", foundElementInCart);
    }

    userFound.markModified("cart");
    // Save the updated user document
    await userFound.save();

    return res
      .status(200)
      .json({ message: "Item added to cart", user: userFound });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { email, name } = req.body;

    const userFound = await User.findOne({ email });

    if (!userFound) {
      return res.status(404).json({ message: "User not found" });
    }

    let cartToModify = userFound.cart;
    // console.log("Current cart:", cartToModify);

    let foundElementInCart = cartToModify.find((item) => item.name === name);
    // console.log("Found element in cart:", foundElementInCart);

    if (!foundElementInCart) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (foundElementInCart.quantity === 1) {
      userFound.cart = cartToModify.filter((item) => item.name !== name);
    } else {
      foundElementInCart.quantity--;
      foundElementInCart.totalPrice =
        foundElementInCart.price * foundElementInCart.quantity;
      // console.log("Updated element in cart:", foundElementInCart);
    }

    userFound.markModified("cart");

    await userFound.save();

    return res
      .status(200)
      .json({ message: "Item removed from cart", user: userFound });
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const { email } = req.query;
    // console.log("email: ", email);
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "cart found", cart: findUser.cart });
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const clearCart = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await User.findOne({ email });
    if (!findUser) {
      return res.status(404).json({ message: "User not found" });
    }
    findUser.cart = [];
    await findUser.save();
    return res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    // console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

export { addToCart, removeFromCart, getCart, clearCart };
