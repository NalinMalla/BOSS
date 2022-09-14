import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";

import ProfileList from "../components/profileList";
import ProfileHead from "../components/profileHead";
import OrderList from "../components/orderList";

import Colors from "../res/colors";

const UserReviewPage = (props) => {
  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const userId = localStorage.getItem("userId");

  const getProductInfoById = (productId) => {
    const ApiURL = `http://localhost:5000/products/${productId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  const getOrdersByUserId = (userId) => {
    const ApiURL = `http://localhost:5000/users/userOrder/${userId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  async function initializeProductData(orderItems) {
    const tempProducts = [];
    for (const item of orderItems) {
      const product = await getProductInfoById(item._id);
      if (product) {
        tempProducts.push({ ...product, count: item.count });
      }
    }
    return tempProducts;
  }

  function initializeOrderData() {
    getOrdersByUserId(userId).then(async (response) => {
      if (response !== null) {
        let tempOrders = [];

        for (const order of response) {
          console.log("orderss");
          console.log(order);
          if (order.status === "Complete") {
            let tempProducts = [];
            const products = await initializeProductData(order.products);
            if (products) {
              tempProducts.push({ ...products });
            }
            order.products = products;
            tempOrders.push(order);
          }
        }
        setOrders(tempOrders.reverse());
        setIsLoaded(true);
      }
    });
  }

  useEffect(() => {
    document.title = "BOSS - Order Page";
    if (userId === undefined || userId === null) {
      window.location = "/signIn";
    } else {
      initializeOrderData(userId);
    }
  }, []);

  // console.log("orders");
  // console.log(orders);

  return (
    <div id="root" style={styles.root}>
      <div
        style={{
          ...styles.wrapper,
          width: "92%",
          flex: 1,
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <div
          style={{
            ...styles.container,
            flex: 0.22,
          }}
        >
          <ProfileHead />
          <ProfileList />
        </div>
        <div
          style={{
            ...styles.container,
            flex: 0.75,
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
            orders.map((element) => <OrderList order={element} />)
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
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

export default UserReviewPage;
