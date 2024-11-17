import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import { addUserToRedux, removeUserFromRedux } from "../userSlice/userSlice";
import { useNavigate } from "react-router-dom";

import axios from "axios";

//TOAST
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearCart, pushToRedux } from "../cartSlice/cartSlice";

const Authenticate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userFromRedux = useSelector((state) => state.user.userDetails);
  const [user, setUser] = useState(userFromRedux);

  const [fetchData, setFetchData] = useState([]);

  async function fetchCart() {
    const response = await axios.get(
      `${import.meta.env.VITE_URL}/API/aiFoodDelivery/cart/getCart?email=${
        userFromRedux.email
      }`
    );
    // console.log("response: ", response.data.cart);
    setFetchData(response.data.cart);
    dispatch(pushToRedux(response.data.cart));
  }

  useEffect(() => {
    // console.log("user from redux:", isAuthenticated);
    if (!isAuthenticated) {
      toast.error("Kindly login to continue");
    }
    if (isAuthenticated) {
      fetchCart();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    setUser(userFromRedux);
  }, [userFromRedux]);

  async function handleCallbackResponse(response) {
    const userObject = jwtDecode(response.credential);
    // console.log("user object after decoding:", userObject);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_URL}/API/aiFoodDelivery/user/getUser?email=${
          userObject.email
        }`
      );
      // console.log("res from get: ", res);
      if (res.data.success) {
        dispatch(addUserToRedux(res.data.foundUser));
      }
    } catch (error) {
      // console.log("error:", error);
      if (error.response.data.success == false) {
        const newUser = {
          email: userObject.email,
        };

        try {
          const registrationResponse = await axios.post(
            `${import.meta.env.VITE_URL}/API/aiFoodDelivery/user/newUser`,
            newUser
          );
          dispatch(addUserToRedux(registrationResponse.user.email));
        } catch (regError) {
          // console.log("Error registering user:", regError);
        }
      } else {
        // console.log("Error fetching user details:", error);
      }
    }
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  function handleSignOut() {
    google.accounts.id.revoke(userFromRedux.sub, () => {
      setUser({});
      dispatch(removeUserFromRedux());
      navigate("/");
    });
    dispatch(clearCart());
  }

  return (
    <div className="authenticate-parent">
      <h1 className="authenticate-heading">
        Login With <span>Google</span>
      </h1>
      {!isAuthenticated ? (
        <div id="signInDiv"></div>
      ) : (
        <button className="signout-button" onClick={handleSignOut}>
          Sign Out
        </button>
      )}
      {user && user.given_name && <div>{user.given_name}</div>}
      <ToastContainer />
    </div>
  );
};

export default Authenticate;
