import * as React from "react";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";

import ProductList from "../components/productList";

import Colors from "../res/colors";

const CartPage = () => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState(0);
  const [grossTotalPrice, setGrossTotalPrice] = useState(0);
  const [shippingFee, setShippingFee] = useState(0);
  const [netTotalPrice, setNetTotalPrice] = useState(0);

  const userId = localStorage.getItem("userId");
  const userCart = JSON.parse(localStorage.getItem("userCart"));

  const getProductInfoById = async (productId) => {
    const ApiURL = `http://localhost:5000/products/${productId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  async function initializeProductData(userCart) {
    const tempProducts = [];
    for (const uc of userCart) {
      const product = await getProductInfoById(uc.productId);
      if (product) {
        tempProducts.push({ ...product, count: uc.count });
      }
    }
    return tempProducts;
  }

  function initializeOrderSummery() {
    // console.log("products");
    // console.log(products);
    setShippingFee(2000);
    let grossTemp = 0;
    let itemsTemp = 0;

    for (let i = 0; i < products.length; i++) {
      grossTemp = grossTemp + products[i].count * products[i].discountPrice;
      itemsTemp = itemsTemp + products[i].count;
    }
    setGrossTotalPrice(grossTemp);
    setItems(itemsTemp);
    setNetTotalPrice(grossTemp + shippingFee);
  }

  useEffect(() => {
    document.title = "BOSS - Cart Page";
    if (userId === undefined || userId === null) {
      window.location = "/signIn";
    } else {
      const fetchProds = async () => {
        const updateProducts = await initializeProductData(userCart);
        setProducts([...updateProducts]);
      };
      fetchProds();
    }
  }, [userCart]);

  useEffect(() => {
    initializeOrderSummery();
    setIsLoaded(true);
  }, [products]);

  console.log("grossTotalPrice");
  console.log(grossTotalPrice);
  console.log("items");
  console.log(items);
  console.log("netTotalPrice");
  console.log(netTotalPrice);

  return (
    <div id="root" style={styles.root}>
      <div
        style={{
          ...styles.wrapper,
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        {/* <div style={{ ...styles.wrapper }}> */}
        {!isLoaded ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              height: "100%",
              marginTop: 20,
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
            <div style={{ ...styles.wrapper, flex: 0.65 }}>
              <ProductList products={products} />
            </div>
            <div
              style={{
                ...styles.container,
                flex: 0.3,
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  ...styles.container,
                  background: "#FFFFFF",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  width: "100%",
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
                  <span>Gross Total ({items} items) :</span>
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

                <Button
                  size="large"
                  fullWidth
                  variant="contained"
                  style={{ marginTop: 20 }}
                  onClick={() => {
                    window.location = `/checkout/?cart`;
                  }}
                >
                  PROCEED TO CHECKOUT
                </Button>
              </div>
            </div>
          </>
        )}
        {/* </div> */}
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

export default CartPage;
