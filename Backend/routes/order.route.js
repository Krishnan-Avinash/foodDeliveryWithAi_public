// routes/orderRoutes.js
import express from "express";
import { createOrder, captureOrder } from "../controllers/order.controller.js";

const router = express.Router();

// Create order route
router.post("/orders", async (req, res) => {
  try {
    const { cart } = req.body;
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    // console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

// Capture order route
router.post("/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    // console.error("Failed to capture order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

export default router;
