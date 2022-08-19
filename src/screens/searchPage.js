import * as React from "react";
import { Audio } from "react-loader-spinner";
import { useState, useEffect } from "react";
import axios from "axios";

import FilterList from "../components/filterList";
import ProductList from "../components/productList";

import Colors from "../res/colors";

const SearchPage = () => {

  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(100000);

  let search = window.location.href.split("?")[1];
  let search1 = search.split("/")[0];
  let search2 = search.split("/")[1];

  if (
    window.location.href.split("?")[1] !== undefined ||
    window.location.href.split("?")[1] !== ""
  ) {
    search = window.location.href.split("?")[1];
    search1 = search.split("/")[0];
    search2 = search.split("/")[1];
    console.log("search1+/+search2");
    console.log(search1 + "/" + search2);
  }

  const getProductsInfo = () => {
    let ApiURL;

    // if (search1 === "all") {
    //   ApiURL = `http://localhost:5000/products/all`;
    // }

    if (search1 === "categories") {
      ApiURL = `http://localhost:5000/products/${search}`;
    }

    else{
      ApiURL = `http://localhost:5000/products/all`;
    }

    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  function initializeProductData() {
    let tempProducts = [];
    getProductsInfo()
      .then((response) => {
        if (response !== null) {
          response.forEach((product) => {
            if (product.discountPrice <= maxPrice && product.discountPrice >= minPrice) {
              tempProducts.push(product);
            }
          });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
    setProducts(tempProducts);
  }

  useEffect(() => {
    document.title = "BOSS - Search Page";
    setIsLoaded(false);
    initializeProductData(search2);
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, [minPrice, maxPrice]);

  return (
    <div id="root" style={styles.root}>
      <div style={styles.wrapper}>
        <FilterList setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
        <div
          style={{
            ...styles.container,
            flex: 0.9,
            background: "#FAFAFA",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            borderRadius: 3,
            justifyContent: "flex-start",
            marginTop: 20,
            marginRight: 60,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "92%",
              marginTop: 20,
              color: Colors.primary,
              fontSize: 28,
              fontWeight: 500,
            }}
          >
            Search Result for "{search}" :
          </div>
          {!isLoaded ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                width: "92%",
                marginTop: 20,
              }}
            >
              <ProductList
                products={products}
                counterDisabled={true}
                counterDisplay={"none"}
              />
            </div>
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
    justifyContent: "space-between",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default SearchPage;
