import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

import OrderList from "../components/orderList";

import Colors from "../res/colors";
import Icons from "../res/icons";
import { Navigate } from "react-router-dom";

const OrderPage = (props) => {
  console.log(window.location.href.split("?")[1]);
  const orderId = window.location.href.split("?")[1];

  const [order, setOrder] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const [status, setStatus] = useState("");
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

  const getOrderId = (orderId) => {
    const ApiURL = `http://localhost:5000/users/order/${orderId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  function initializeOrderData() {
    getOrderId(orderId).then((userOrder) => {
      if (userOrder !== null) {
        let tempProducts = [];
        setStatus(userOrder.status);
        console.log("userOrder");
        console.log(userOrder);
        userOrder.products.forEach((product) => {
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
        });

        userOrder.products = tempProducts;
        setOrder(userOrder);
      }
    });
  }

  function handleSubmit() {
    if (status !== "") {
      axios
        .put(`http://localhost:5000/users/updateOrder/${orderId}`, {
          status: status,
        })
        .then((response) => {
          console.log(response);
          if (status === "Complete") {
            order.products.forEach((product) => {
              axios
                .put(
                  `http://localhost:5000/products/addValidReviewer/${product._id}`,
                  { userId: order.user }
                )
                .then((response) => {
                  console.log(response);
                })
                .catch((error) => {
                  console.log(error);
                });
            });
          }
          alert(`Successfully changed status of Order ${orderId} to ${status}`);
          navigate(`/orders`);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  useEffect(() => {
    document.title = "BOSS - Order Management";
    initializeOrderData(orderId);
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  console.log("order");
  console.log(order);
  console.log("status");
  console.log(status);

  return (
    <div id="root" style={styles.root}>
      <Toolbar />
      <div
        style={{
          ...styles.wrapper,
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <div
          style={{
            ...styles.container,
            flex: 0.9,
            background: "#FAFAFA",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 3,
          }}
        >
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
                marginTop: 32,
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
              <OrderList order={order} />
              <div style={{ width: "90%", marginBottom: 20 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                      Shipping Details
                    </Typography>
                    <div>User ID: {order.user}</div>
                    <div>
                      Receivers Name:{" "}
                      {order.address.receiversName.firstName +
                        " " +
                        order.address.receiversName.lastName}
                    </div>
                    <div>Email Address: {order.address.email}</div>
                    <div>Contact Number: {order.address.contact}</div>
                    <div>
                      Address: Province {order.address.province},{" "}
                      {order.address.city}
                    </div>
                    <div>Address Details: {order.address.addressDetail}</div>
                    <div>Zip Code: {order.address.zipCode}</div>
                  </Grid>
                  <Grid item container direction="column" xs={12} sm={4}>
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Payment details
                      </Typography>
                      <img
                        src={Icons.CashOnDelivery}
                        alt="Cash On Delivery"
                        style={{ width: 70, height: 70, marginTop: 10 }}
                      />
                      <div style={{ marginTop: 10 }}>Cash on Delivery</div>
                    </div>

                    <Grid container></Grid>
                  </Grid>
                </Grid>
                <br />
                <hr style={{ width: "100%" }} />
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Order Status:
                  </FormLabel>
                  <RadioGroup
                    defaultValue={status}
                    name="radio-buttons-group"
                    value={status}
                    onChange={handleStatusChange}
                    row
                  >
                    <FormControlLabel
                      value="Pending"
                      control={<Radio />}
                      label="Pending"
                    />
                    <FormControlLabel
                      value="Processing"
                      control={<Radio />}
                      label="Processing"
                    />
                    <FormControlLabel
                      value="Complete"
                      control={<Radio />}
                      label="Complete"
                    />
                    <FormControlLabel
                      value="Returning"
                      control={<Radio />}
                      label="Returning"
                    />
                    <FormControlLabel
                      value="Returned"
                      control={<Radio />}
                      label="Returned"
                    />
                    <FormControlLabel
                      value="Cancelled"
                      control={<Radio />}
                      label="Cancelled"
                    />
                  </RadioGroup>
                </FormControl>
                <br />
                <Button
                  variant="contained"
                  style={{ marginTop: 8 }}
                  onClick={handleSubmit}
                >
                  Update Status
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default OrderPage;
