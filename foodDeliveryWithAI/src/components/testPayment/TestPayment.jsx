import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../cartSlice/cartSlice";

// Renders errors or successful transactions on the screen
function Message({ content }) {
  return <p>{content}</p>;
}

function TestPayment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const itemsList = useSelector((state) => state.reducer.itemsList);
  const userFromRedux = useSelector((state) => state.user.userDetails.email);

  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let counter2 = 0;
    if (itemsList.length != 0) {
      for (let i = 0; i < itemsList.length; i++) {
        counter2 = counter2 + itemsList[i].price * itemsList[i].quantity;
      }
    }
    setTotalPrice((counter2 * 100) / 100);
  }, [itemsList]);
  // const totalPrice = useSelector((state) => state.reducer.totalPrice);
  // console.log("itemsList: ", itemsList);
  // console.log("totalPrice: ", totalPrice);
  const initialOptions = {
    "client-id":
      "AQH_S73Wcp3LqpmNGfG9L70FdpKKjY8Wfhc9sbCvsaG_xMADeW4Br_4Wk-m_UERa5fd_yg805zryxgpo",
    "enable-funding": "venmo",
    "disable-funding": "",
    "buyer-country": "US",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };

  const [message, setMessage] = useState("");

  async function handleClear() {
    dispatch(clearCart());
    await axios.post(
      `${import.meta.env.VITE_URL}/API/aiFoodDelivery/cart/clearCart`,
      { email: userFromRedux }
    );
  }

  async function handleOrderPlacement() {
    await axios.post(
      `${import.meta.env.VITE_URL}/API/aiFoodDelivery/userOrder/newOrder`,
      { itemsList, email: userFromRedux, totalPrice }
    );
  }

  return (
    <div className="payment-parent">
      <div>
        <PayPalScriptProvider options={initialOptions}>
          <PayPalButtons
            style={{
              shape: "rect",
              layout: "vertical",
              color: "gold",
              label: "paypal",
            }}
            createOrder={async () => {
              try {
                // Updated URL to match backend route
                const response = await fetch(
                  `${
                    import.meta.env.VITE_URL
                  }/API/aiFoodDelivery/payment/orders`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      cart: itemsList,
                      totalPrice: totalPrice,
                    }),
                  }
                );

                const orderData = await response.json();

                if (orderData.id) {
                  return orderData.id;
                } else {
                  const errorDetail = orderData?.details?.[0];
                  const errorMessage = errorDetail
                    ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                    : JSON.stringify(orderData);

                  throw new Error(errorMessage);
                }
              } catch (error) {
                // console.error("Error in createOrder:", error);
                setMessage(
                  `Could not initiate PayPal Checkout... ${error.message}`
                );
              }
            }}
            onApprove={async (data) => {
              try {
                // Updated to use axios with the correct endpoint
                const response = await axios.post(
                  `${
                    import.meta.env.VITE_URL
                  }/API/aiFoodDelivery/payment/orders/${data.orderID}/capture`
                );

                const orderData = response.data;

                const errorDetail = orderData?.details?.[0];

                if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                  return actions.restart(); // Retry if recoverable error
                } else if (errorDetail) {
                  throw new Error(
                    `${errorDetail.description} (${orderData.debug_id})`
                  );
                } else {
                  const transaction =
                    orderData.purchase_units[0].payments.captures[0];
                  setMessage(
                    `Transaction ${transaction.status}: ${transaction.id}.`
                  );
                  handleClear();
                  handleOrderPlacement();
                  navigate("/");
                  // console.log(
                  //   "Capture result",
                  //   orderData,
                  //   JSON.stringify(orderData, null, 2)
                  // );
                }
              } catch (error) {
                // console.error("Error in onApprove:", error);
                setMessage(
                  `Transaction could not be processed... ${error.message}`
                );
              }
            }}
            onError={(err) => {
              // console.error("PayPal Button error:", err);
              setMessage(
                "An error occurred with PayPal Checkout. Please try again."
              );
            }}
          />
        </PayPalScriptProvider>
        <Message content={message} />
      </div>
      <div className="payment-right">
        <h1>Use these credentials for payment</h1>
        <h1>Card Number: 371449635398431</h1>
        <h1>Expires: 11/29</h1>
        <h1>CSC: 1111</h1>
        <h1>First Name: k</h1>
        <h1>Last Name: k</h1>
        <h1>Street Address: k</h1>
        <h1>Apt., ste., bldg: k</h1>
        <h1>City: hawaii</h1>
        <h1>State: Hawaii</h1>
        <h1>ZIP Code: 99950</h1>
        <h1>Mobile: (993) 923-9338</h1>
        <h1>Email: nine@gmail.com</h1>
      </div>
    </div>
  );
}

export default TestPayment;
