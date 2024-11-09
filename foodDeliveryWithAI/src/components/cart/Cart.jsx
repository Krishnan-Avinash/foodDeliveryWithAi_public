import React, { useState, useEffect } from "react";

// MUI
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// ROUTER
import { Link } from "react-router-dom";

// REDUX
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  addToCartAsync,
  removeFromCart,
  removeFromCartAsync,
} from "../cartSlice/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const itemsList = useSelector((state) => state.reducer.itemsList);
  // const totalPrice = useSelector((state) => state.reducer.totalPrice);
  const userLoggedIn = useSelector((state) => state.user.userDetails);

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

  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const removeFromCartFunction = (comingName) => {
    dispatch(
      removeFromCartAsync({
        name: comingName,
        userLoggedIn: userLoggedIn.email,
      })
    );
  };

  const addToCartFunction = (comingName, comingPrice) => {
    if (userLoggedIn) {
      dispatch(
        addToCartAsync({
          name: comingName,
          price: comingPrice,
          userLoggedIn: userLoggedIn.email,
        })
      );
    } else {
      // console.log("User is not logged in.");
    }
  };

  return (
    <div className="cart-parent">
      <div className="cart-left">
        <div className="cart-left-top">
          <h1>Food Cart</h1>
          <h3>
            <span style={{ textDecoration: "underline" }}>
              {itemsList.length == 0 ? "NO" : `${itemsList.length}`}
            </span>{" "}
            item in your cart
          </h3>
        </div>
        <div className="cart-left-listout">
          {totalPrice != 0 && (
            <TableContainer component={Paper} className="table-container">
              <Table
                className="hmnh"
                sx={{ minWidth: 650 }}
                aria-label="simple table"
              >
                <TableHead className="header-1">
                  <TableRow className="header-2">
                    <TableCell className="header-3">Item</TableCell>
                    <TableCell className="header-3" align="right">
                      Price
                    </TableCell>
                    <TableCell className="header-3" align="right">
                      Quantity&nbsp;
                    </TableCell>
                    <TableCell className="header-3" align="right">
                      Total Price&nbsp;
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="hmnh-2">
                  {itemsList.map((row) => (
                    <TableRow
                      className="hmnh-3"
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">${row.price}</TableCell>
                      <TableCell align="right" className="hmnh-4">
                        <button
                          className="minus"
                          onClick={() =>
                            removeFromCartFunction(row.name, row.price)
                          }
                        >
                          -
                        </button>
                        <p>{row.quantity}</p>
                        <button
                          className="plus"
                          onClick={() => addToCartFunction(row.name, row.price)}
                        >
                          +
                        </button>
                      </TableCell>
                      <TableCell align="right">
                        ${Math.round(row.totalPrice * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
      <div className="cart-right">
        <div className="cart-right-bottom">
          <h1>Cart Total</h1>
          <table>
            <tr>
              <td>Cart Subtotal</td>
              <td className="r-2">${totalPrice}</td>
            </tr>
            <tr>
              <td>Delivery</td>
              <td className="r-2" style={{ color: "green" }}>
                Free
              </td>
            </tr>
            <tr>
              <th>Cart total</th>
              <td className="r-2">
                <h3>${totalPrice}</h3>
              </td>
            </tr>
          </table>
          *Proceed for discounts
          {isAuthenticated ? (
            totalPrice ? (
              <Link to="/checkout">
                <button>Proceed to Checkout</button>
              </Link>
            ) : (
              <Link>
                <button>Cart Is Empty</button>
              </Link>
            )
          ) : (
            <Link to="/login">
              <button>Login To Checkout</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
