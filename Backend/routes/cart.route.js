import express from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
} from "../controllers/cart.controller.js";

const cartRouter = express.Router();

cartRouter.post("/addToCart", addToCart);
cartRouter.post("/removeFromCart", removeFromCart);
cartRouter.get("/getCart", getCart);
cartRouter.post("/clearCart", clearCart);

export default cartRouter;
