import React, { useEffect, useState } from "react";

//MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Input } from "@mui/base/Input";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//ROUTER
import { Link, useNavigate } from "react-router-dom";

//REDUX
import { useSelector } from "react-redux";

//AXIOS
import axios from "axios";

const Checkout = () => {
  const navigate = useNavigate();
  const itemsList = useSelector((state) => state.reducer.itemsList);
  const userFromRedux = useSelector((state) => state.user.userDetails);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
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

  const [userDetailsAfterFetch, setUserDetailsAfterFetch] = useState({});
  async function getUserDetails() {
    const response = await axios.get(
      `import.meta.env.VITE_URL/API/aiFoodDelivery/user/getUser?email=${userFromRedux.email}`
    );
    // console.log("response: ", response.data.foundUser);
    setUserDetailsAfterFetch(response.data.foundUser);
    setFirstName(response.data.foundUser.firstName);
    setLastName(response.data.foundUser.lastName);
    setMobile(response.data.foundUser.mobile);
    setAddress(response.data.foundUser.address);
    setLandmark(response.data.foundUser.landmark);
    setPincode(response.data.foundUser.pincode);
  }
  useEffect(() => {
    getUserDetails();
  }, []);

  const rows = [];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState(
    isAuthenticated ? userFromRedux.email : ""
  );
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");

  const notify = async () => {
    if (!firstName || !lastName || !mobile || !email || !address || !pincode) {
      toast.error("All fields required!!");
    }
    if (mobile.length != 10) {
      toast.error("Mobile Number incorrect");
    }
    if (pincode.length != 6) {
      toast.error("Pincode incorrect");
    }
    try {
      const response = await axios.patch(
        "import.meta.env.VITE_URL/API/aiFoodDelivery/user/updateUser",
        {
          firstName,
          lastName,
          mobile,
          email,
          address,
          landmark,
          pincode,
        }
      );

      // Handle successful response
      toast.success("Details updated successfully!");
      navigate("/temp");
      // console.log("Updated user details:", response.data);
    } catch (error) {
      // Handle error response
      toast.error("Failed to update details. Please try again.");
      // console.error("Error updating details:", error);
    }
  };

  const [couponDiscount, setCouponDiscount] = useState(0);
  const [couponInput, setCouponInput] = useState("");

  const checkCoupon = () => {
    // console.log("couponInput::", couponInput);
    if (
      couponInput == import.meta.env.VITE_COUPON_ONE ||
      couponInput == import.meta.env.VITE_COUPON_TWO ||
      couponInput == import.meta.env.VITE_COUPON_THREE
    ) {
      toast.success("Coupon has been applied");
      setCouponDiscount((((totalPrice * 5) / 100) * 100) / 100);
    } else {
      toast.error("Invalid Coupon");
      setCouponDiscount(0);
    }
  };

  return (
    <div className="checkout-parent">
      <div className="checkout-left">
        <div className="checkout-left-top">
          <h1>Checkout</h1>
          <h3>
            Review your items and complete your purchase securely. Enjoy fast,
            reliable delivery and great food at your doorstep!
          </h3>
        </div>
        <div className="checkout-left-listout">
          <TableContainer component={Paper} className="table-container">
            <Table
              className="hmnh"
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              <TableHead className="header-1">
                <TableRow className="header-2">
                  <TableCell className="header-3">First Name</TableCell>
                  <TableCell className="header-3" align="right">
                    <Box sx={{ width: 500, maxWidth: "100%" }}>
                      <TextField
                        fullWidth
                        id="fullWidth"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead className="header-1">
                <TableRow className="header-2">
                  <TableCell className="header-3">Last Name</TableCell>
                  <TableCell>
                    <Box sx={{ width: 500, maxWidth: "100%" }}>
                      <TextField
                        fullWidth
                        id="fullWidth"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead className="header-1">
                <TableRow className="header-2">
                  <TableCell className="header-3">Mobile Number</TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="number-input-checkout"
                      onChange={(e) => setMobile(e.target.value.slice(0, 10))}
                      value={mobile}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead className="header-1">
                <TableRow className="header-2">
                  <TableCell className="header-3">Email Address</TableCell>
                  <TableCell className="header-3" align="right">
                    <Box sx={{ width: 500, maxWidth: "100%" }}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        id="fullWidth"
                        value={userFromRedux.email}
                      />
                    </Box>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead className="header-1">
                <TableRow className="header-2">
                  <TableCell className="header-3">Address</TableCell>
                  <TableCell className="multiline-input">
                    <TextareaAutosize
                      className="multiline-input-2"
                      aria-label="minimum height"
                      minRows={3}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead className="header-1">
                <TableRow className="header-2">
                  <TableCell className="header-3">
                    Landmark (optional)
                  </TableCell>
                  <TableCell className="multiline-input">
                    <TextareaAutosize
                      className="multiline-input-2"
                      aria-label="minimum height"
                      minRows={1}
                      value={landmark}
                      onChange={(e) => setLandmark(e.target.value)}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableHead className="header-1">
                <TableRow className="header-2">
                  <TableCell className="header-3">Pincode</TableCell>
                  <TableCell>
                    <input
                      type="number"
                      className="number-input-checkout"
                      onChange={(e) => setPincode(e.target.value.slice(0, 6))}
                      value={pincode}
                    />
                  </TableCell>
                </TableRow>
              </TableHead>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className="checkout-right">
        <div className="checkout-right-top">
          <h1>Coupon Code</h1>
          <p>
            Have a coupon code? Enter it here to unlock exclusive discounts and
            save on your order!
          </p>
          <input
            type="text"
            placeholder="Coupon Code"
            className="coupon-input"
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <button className="apply-coupon" onClick={checkCoupon}>
            Apply
          </button>
        </div>
        <div className="checkout-right-bottom">
          <h1>Cart Total</h1>
          <table>
            <tr>
              <td>Cart Subtotal</td>
              <td className="r-2">${totalPrice}</td>
            </tr>
            <tr>
              <td>Delivery</td>
              <td className="r-2">Free</td>
            </tr>
            <tr>
              <td>Discount(5%)</td>
              <td className="r-2" style={{ color: "green" }}>
                -$
                {totalPrice
                  ? Math.round(((totalPrice * 5) / 100) * 100) / 100
                  : 0}
              </td>
            </tr>
            <tr>
              <td>Coupon Discount</td>
              <td className="r-2">
                {couponDiscount && (
                  <span style={{ color: "green" }}>
                    - ${Math.round(couponDiscount * 100) / 100}
                  </span>
                )}
              </td>
            </tr>
            <tr>
              <th>Cart total</th>
              <td className="r-2">
                <h3>
                  $
                  {totalPrice
                    ? Math.round(
                        (totalPrice - couponDiscount - (totalPrice * 5) / 100) *
                          100
                      ) / 100
                    : 0}
                </h3>
              </td>
            </tr>
          </table>
          <Link className="a" onClick={notify}>
            <button>Proceed to Checkout</button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Checkout;
