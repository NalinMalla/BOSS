import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";

import ProfileList from "../components/profileList";
import ProfileHead from "../components/profileHead";
import ProductList from "../components/productList";

import Colors from "../res/colors";

const TaggedItemPage = (props) => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const userId = localStorage.getItem("userId");
  const userTaggedItem =
    localStorage.getItem("userId") !== "undefined" &&
    localStorage.getItem("userId") !== undefined &&
    localStorage.getItem("userId") !== null
      ? localStorage.getItem("userTaggedItem").split(",")
      : [];

  const getProductInfoById = (productId) => {
    const ApiURL = `http://localhost:5000/products/${productId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  // function initializeProductData(userTaggedItem) {
  //   var tempProducts = [];
  //   userTaggedItem.forEach((element) => {
  //     getProductInfoById(element)
  //       .then((response) => {
  //         if (response !== null) {
  //           console.log("response");
  //           console.log(response);
  //           tempProducts.push(response);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error", err);
  //       });
  //   });
  //   setProducts(tempProducts);
  // }

  async function initializeProductData(userTaggedItem) {
    const tempProducts = [];
    for(const item of userTaggedItem){
      const product = await getProductInfoById(item);
      if(product){
        tempProducts.push({...product});
      }
    }
    return tempProducts;
  }

  useEffect(() => {
    document.title = "BOSS - Tagged Item Page";
    if (userId === undefined || userId === null) {
      window.location = "/signIn";
    } else {
      // setTimeout(() => {
      //   setIsLoaded(true);
      // }, 2000);
      // initializeProductData(userTaggedItem);
      const fetchProds = async () => {
        const updateProducts = await initializeProductData(userTaggedItem);
        setProducts([...updateProducts]);
        setIsLoaded(true);
      }
      fetchProds();
    }
  }, []);

  console.log("products");
  console.log(products);

  return (
    <div id="root" style={styles.root}>
      <div
        style={{
          ...styles.wrapper,
          flex: 1,
          justifyContent: "space-between",
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
          <div style={{ ...styles.wrapper }}>
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
              <ProductList
                counterDisabled={true}
                counterDisplay={"none"}
                products={products}
              />
            )}
          </div>
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
    width: "92%",
    marginTop: 20,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default TaggedItemPage;
