import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDb } from "./config/db.js";
import geminiRouter from "./routes/gemini.route.js";
import userRouter from "./routes/user.route.js";
import router from "./routes/order.route.js";
import cartRouter from "./routes/cart.route.js";
import newOrderRouter from "./routes/newOrder.route.js";

connectDb();
const app = express();
app.use(express.json());
app.use(cors());

//GEMINI
app.use("/API/aiFoodDelivery/", geminiRouter);

//USER
app.use("/API/aiFoodDelivery/user/", userRouter);

//PAYPAL
app.use("/API/aiFoodDelivery/payment", router);

//CART
app.use("/API/aiFoodDelivery/cart/", cartRouter);

//USER ORDERS
app.use("/API/aiFoodDelivery/userOrder", newOrderRouter);

app.listen(process.env.PORT, () => {
  console.log("App is listening on port: ", process.env.PORT);
});
