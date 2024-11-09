import React, { useEffect, useState } from "react";

//AXIOS
import axios from "axios";

//REDUX
import { useSelector } from "react-redux";

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

const Orders = () => {
  const userEmail = useSelector((state) => state.user.userDetails);
  const [fetchedData, setFetchedData] = useState([]);
  async function getOrders() {
    const response = await axios.get(
      `http://localhost:6374/API/aiFoodDelivery/userOrder/getOrder?email=${userEmail.email}`
    );
    // console.log("response: ", response.data.orders);
    setFetchedData(response.data.orders);
  }
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="orders-parent">
      <div className="orders-left">
        <div className="orders-left-top">
          <h1>Orders :</h1>
        </div>
        <div className="orders-left-listout">
          <TableContainer component={Paper} className="table-container">
            <Table
              className="hmnh"
              sx={{ minWidth: 650 }}
              aria-label="simple table"
            >
              {fetchedData.map((item, index) => (
                <TableHead key={Math.random()} className="header-1">
                  <TableRow className="header-2">
                    <TableCell
                      className="header-3"
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <p>Items</p>
                      <div>
                        {item.items.map((item2, index2) => (
                          <div
                            key={Math.random()}
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <div>
                              <p>{item2.name}</p>
                              <p>{item2.quantity}</p>
                              <p>{item2.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="header-3" align="right">
                      <Box sx={{ width: 100, maxWidth: "100%" }}>
                        <TableCell>Price:</TableCell>
                        <TableCell>{item.totalPrice}</TableCell>
                      </Box>
                    </TableCell>
                  </TableRow>
                </TableHead>
              ))}
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default Orders;
