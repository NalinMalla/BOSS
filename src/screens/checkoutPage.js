import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Audio } from "react-loader-spinner";

import Checkout from "../components/checkout";

import Colors from "../res/colors";

const CheckoutPage = () => {
  const userCart = JSON.parse(localStorage.getItem("userCart"));

  const order = window.location.href.split("?")[1];

  const productId = order.split("&")[0];
  let count = order.split("&")[1];
  console.log(productId);
  console.log(count);

  const [isLoaded, setIsLoaded] = useState(false);
  const [products, setProducts] = useState([]);

  const getProductInfoById = (productId) => {
    const ApiURL = `http://localhost:5000/products/${productId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  function initializeCartData(userCart) {
    var tempProducts = [];
    userCart.forEach((element) => {
      getProductInfoById(element.productId)
        .then((response) => {
          if (response !== null) {
            response = { ...response, count: element.count };
            tempProducts.push(response);
          }
        })
        .catch((err) => {
          console.log("Error", err);
        });
    });
    setProducts(tempProducts);
  }

  async function initializeProductData(productId) {
    const productInfo = await getProductInfoById(productId);
    if (productInfo === null) {
      alert("Error: Unable to access server.");
    } else {
      console.log("{ ...productInfo, count: count }");
      console.log({
        ...productInfo,
        count: window.location.href.split("&")[1],
      });
      products[0] = {
        ...productInfo,
        count: Number(window.location.href.split("&")[1]),
      };
    }
  }

  useEffect(() => {
    document.title = "BOSS - Checkout Page";
    if (userCart) {
      if (productId === "cart") {
        console.log("Cart checkout");
        initializeCartData(userCart);
        setTimeout(() => {
          setIsLoaded(true);
        }, 2000);
      } else {
        if (
          productId === "" ||
          count === "" ||
          productId === undefined ||
          count === undefined
        ) {
          window.location = "/signIn";
        } else {
          console.log("Single product checkout");
          if (products.length === 0) {
            console.log("products.length === 0");
            initializeProductData(productId);
            setTimeout(() => {
              setIsLoaded(true);
            }, 2000);
          }
        }
      }
    }
    else{
      window.location = "/signIn";
    }
  }, []);

  console.log("products");
  console.log(products);

  let grossTotalPrice = 0;
  let shippingFee = 2000;
  count = 0;

  for (let i = 0; i < products.length; i++) {
    grossTotalPrice =
      grossTotalPrice + products[i].count * products[i].discountPrice;
    count = count + products[i].count;
  }

  let netTotalPrice = grossTotalPrice + shippingFee;

  return (
    <div id="root" style={styles.root}>
      {!isLoaded ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "89%",
            borderRadius: 3,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            padding: 20,
            paddingTop: 60,
            paddingBottom: 40,
            background: "#FFFFFF",
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
        <div
          style={{
            ...styles.wrapper,
            justifyContent: "space-between",
            marginTop: 20,
            flex: 1,
          }}
        >
          <div style={{ display: "flex", flex: 0.68 }}>
            <Checkout
              products={products}
              grossTotalPrice={grossTotalPrice}
              shippingFee={shippingFee}
              netTotalPrice={netTotalPrice}
            />
          </div>

          <div
            style={{
              ...styles.container,
              flex: 0.28,
              justifyContent: "flex-start",
            }}
          >
            <div
              style={{
                ...styles.container,
                background: "#FFFFFF",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                width: "89%",
                borderRadius: 3,
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                padding: 20,
              }}
            >
              <span style={{ fontSize: 28, color: Colors.primary }}>
                Order Summary
              </span>

              <div
                style={{
                  ...styles.wrapper,
                  justifyContent: "space-between",
                  fontSize: 18,
                  marginTop: 10,
                  width: "100%",
                }}
              >
                <span>Gross Total ({count} items) :</span>
                <span>Rs. {grossTotalPrice}</span>
              </div>

              <div
                style={{
                  ...styles.wrapper,
                  justifyContent: "space-between",
                  fontSize: 18,
                  marginTop: 10,
                  width: "100%",
                }}
              >
                <span>Shipping Fee :</span>
                <span>Rs. {shippingFee}</span>
              </div>

              <div
                style={{
                  ...styles.wrapper,
                  justifyContent: "space-between",
                  fontSize: 18,
                  marginTop: 10,
                  width: "100%",
                }}
              >
                <span>Net Total :</span>
                <span>Rs. {netTotalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      )}
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
    width: "92%",
    borderRadius: 3,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
  },
};

export default CheckoutPage;
