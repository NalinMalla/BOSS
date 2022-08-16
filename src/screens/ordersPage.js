import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";

import Header from "../components/header";
import NavBar from "../components/navBar";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import SignIn from "../components/signIn";
import CustomModal from "../components/CustomModal";
import ProfileList from "../components/profileList";
import ProfileHead from "../components/profileHead";
import ProductList from "../components/productList";
import OrderList from "../components/orderList";

import Colors from "../res/colors";

const OrdersPage = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const [orders, setOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const userId = localStorage.getItem("userId");
  let navigate = useNavigate();

  const getProductInfoById = (productId) => {
    const ApiURL = `http://localhost:5000/products/${productId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  const getOrdersByUserId = (userId) => {
    const ApiURL = `http://localhost:5000/users/order/${userId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  function initializeOrderData(userCart) {
    getOrdersByUserId(userId).then((response) => {
      if (response !== null) {
        console.log("response");
        console.log(response);
        let tempOrders = new Array();
        // setOrders(response);
        // console.log("orders");
        // console.log(orders);
        response.forEach((order) => {
          let tempProducts = [];
          order.products.forEach((product) => {
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
          // console.log("tempProducts");
          // console.log(tempProducts);
          order.products = tempProducts;
          // console.log("order");
          // console.log(order);
          tempOrders.push(order);
        });
        setOrders(tempOrders);
      }
    });
    // let tempProducts = [];
    // userCart.forEach((element) => {
    //   getProductInfoById(element.productId)
    //     .then((response) => {
    //       if (response !== null) {
    //         response = { ...response, count: element.count };
    //         tempProducts.push(response);
    //       }
    //     })
    //     .catch((err) => {
    //       console.log("Error", err);
    //     });
    // });
    // setProducts(tempProducts);
  }

  useEffect(() => {
    // setTimeout(() => {
    //   setIsLoaded(true);
    // }, 2000);
    document.title = "BOSS - Order Page";
    if (userId === undefined || userId === null) {
      navigate("/signIn");
    } else {
      initializeOrderData(userId);
      setTimeout(() => {
        setIsLoaded(true);
      }, 2000);
    }
  }, []);

  return (
    <div id="root" style={styles.root}>
      <Header handleSignIn={handleOpenModal} />
      <NavBar />
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
              marginTop: 32
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
            orders.map((element) => (
            <OrderList order={element} />
            ))
          )}
        </div>
      </div>

      <div
        style={{
          ...styles.container,
          backgroundColor: Colors.primary,
          width: "100%",
          marginTop: 60,
        }}
      >
        <SiteMap />
        <Copyright />
      </div>

      <CustomModal
        open={openModal}
        onClose={handleCloseModal}
        component={<SignIn />}
      />
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

export default OrdersPage;
