import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { IconButton } from "@mui/material";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { useNavigate } from "react-router-dom";

import AdminFrame from "../components/adminFrame";

import Colors from "../res/colors";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [status, setStatus] = useState("Pending");

  const navigate = useNavigate();

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const getProductInfoById = (productId) => {
    const ApiURL = `http://localhost:5000/products/${productId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  const getOrdersByStatus = (status) => {
    const ApiURL = `http://localhost:5000/users/orders/${status}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  function initializeOrderData() {
    getOrdersByStatus(status).then((response) => {
      if (response !== null) {
        let tempOrders = [];

        for (const order of response) {
          let tempProducts = [];
          for (const product of order.products) {
            getProductInfoById(product._id)
              .then((response) => {
                if (response !== null) {
                  response = { ...response, count: product.count };
                  tempProducts.push(response);
                }
              })
              .catch((err) => {
                console.log("Error", err);
              });
          }
          order.products = tempProducts;
          tempOrders.push(order);
        }
        setOrders(tempOrders.reverse());
        console.log("orders");
        console.log(orders);
        setIsLoaded(true);
      }
    });
  }

  useEffect(() => {
    document.title = "BOSS - Order Management Page";
    initializeOrderData();
  }, [status]);

  return (
    <div style={{ display: "flex" }}>
      <AdminFrame />
      {!isLoaded ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            padding: 20,
            paddingTop: 60,
            paddingBottom: 40,
            marginTop: 80,
          }}
        >
          <Audio
            height="100"
            width="100"
            radius="12"
            color={Colors.primary}
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />

          <div style={{ fontSize: 22, fontWeight: 500, marginTop: 10 }}>
            Loading...
          </div>
        </div>
      ) : (
        <>
          <Toolbar />

          <TableContainer component={Paper} style={{ marginTop: 100 }}>
            <div style={{ display: "flex", padding: 20, alignItems: "center" }}>
              Display by:
              <FormControl
                required
                defaultValue="Pending"
                size="small"
                style={{ marginLeft: 20 }}
              >
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  name="status"
                  value={status}
                  onChange={handleStatusChange}
                >
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Processing">Processing</MenuItem>
                  <MenuItem value="Complete">Complete</MenuItem>
                  <MenuItem value="Returning">Returning</MenuItem>
                  <MenuItem value="Returned">Returned</MenuItem>
                  <MenuItem value="Cancelled">Cancelled</MenuItem>
                </Select>
              </FormControl>
            </div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Order ID</TableCell>
                  <TableCell align="left">Customer ID</TableCell>
                  <TableCell align="left">Shipping Address</TableCell>
                  <TableCell align="left">Order Date</TableCell>
                  <TableCell align="left">Total Price</TableCell>
                  <TableCell align="left">Status</TableCell>
                  <TableCell align="left">Details</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders.map((row) => (
                  <TableRow
                    key={row._id}
                    // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row._id}
                    </TableCell>
                    <TableCell align="left">{row.user}</TableCell>
                    <TableCell align="left">
                      Province:{row.address.province}, {row.address.city}
                    </TableCell>
                    <TableCell align="left">
                      {row.createdAt.slice(0, 10)}
                    </TableCell>
                    <TableCell align="left">Rs. {row.netTotalPrice}</TableCell>
                    <TableCell align="left">{row.status}</TableCell>

                    <TableCell align="left">
                      <IconButton
                        onClick={() => {
                          navigate(`/order/?${row._id}`);
                        }}
                      >
                        <LibraryBooksIcon
                          color="primary"
                          style={{ width: 23, height: 23 }}
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Toolbar />
        </>
      )}
    </div>
  );
}
