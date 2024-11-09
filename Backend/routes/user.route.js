import express from "express";
import {
  createUser,
  getUser,
  updateUser,
} from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post("/newUser", createUser);
userRouter.patch("/updateUser", updateUser);
userRouter.get("/getUser", getUser);

export default userRouter;
