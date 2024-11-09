import express from "express";
import { getOrders, newOrder } from "../controllers/userOrder.controller.js";

const newOrderRouter = express.Router();

newOrderRouter.post("/newOrder", newOrder);
newOrderRouter.get("/getOrder", getOrders);

export default newOrderRouter;
