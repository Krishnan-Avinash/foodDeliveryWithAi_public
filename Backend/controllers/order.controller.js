// controllers/orderController.js
import {
  ApiError,
  Client,
  Environment,
  LogLevel,
  OrdersController,
} from "@paypal/paypal-server-sdk";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET } = process.env;

const client = new Client({
  clientCredentialsAuthCredentials: {
    oAuthClientId: PAYPAL_CLIENT_ID,
    oAuthClientSecret: PAYPAL_CLIENT_SECRET,
  },
  timeout: 0,
  environment: Environment.Sandbox,
  logging: {
    logLevel: LogLevel.Info,
    logRequest: { logBody: true },
    logResponse: { logHeaders: true },
  },
});

const ordersController = new OrdersController(client);

/**
 * Create an order to start the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_create
 */
export const createOrder = async (cart) => {
  // console.log("cart::", cart);

  // Calculate total price from the cart items
  let totalPrice = 0;
  cart.forEach((item) => {
    totalPrice += item.totalPrice;
  });
  // console.log("totalPrice::", totalPrice);

  const collect = {
    body: {
      intent: "CAPTURE",
      purchaseUnits: [
        {
          amount: {
            currencyCode: "USD",
            value: totalPrice.toFixed(2), // Ensure value is a string in correct format
          },
        },
      ],
    },
    prefer: "return=minimal",
  };

  try {
    // Call PayPal Orders API to create an order
    const response = await ordersController.ordersCreate(collect);

    // Check if response has a body property
    if (response && response.body) {
      const { body, ...httpResponse } = response;
      return {
        jsonResponse: JSON.parse(body),
        httpStatusCode: httpResponse.statusCode,
      };
    } else {
      throw new Error(
        "Response from PayPal API did not contain expected body."
      );
    }
  } catch (error) {
    // console.error("Failed to create order:", error);

    // Handle API-specific errors if available
    if (error instanceof ApiError) {
      // console.error("PayPal API error details:", error);
      throw new Error(error.message);
    } else {
      // General error handling
      throw new Error("An unexpected error occurred while creating order.");
    }
  }
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
export const captureOrder = async (orderID) => {
  const collect = {
    id: orderID,
    prefer: "return=minimal",
  };

  try {
    const { body, ...httpResponse } = await ordersController.ordersCapture(
      collect
    );
    return {
      jsonResponse: JSON.parse(body),
      httpStatusCode: httpResponse.statusCode,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      throw new Error(error.message);
    }
  }
};
