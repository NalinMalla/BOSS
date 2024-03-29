import * as React from "react";
import { Audio } from "react-loader-spinner";
import { useState, useEffect } from "react";
import axios from "axios";
import Toolbar from "@mui/material/Toolbar";

import FilterList from "../components/filterList";
import AdminFrame from "../components/adminFrame";
import ProductList from "../components/productList";

import Colors from "../res/colors";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [minPrice, setMinPrice] = React.useState(0);
  const [maxPrice, setMaxPrice] = React.useState(100000);

  let search = window.location.href.split("?")[1];
  let category = search.split(":")[0];
  const searchType = category.split("/")[0];
  console.log("searchType");
  console.log(searchType);
  console.log(searchType === "hotDeals");

  let searchText;
  if (search.split(":")[1] !== undefined && search.split(":")[1] !== "") {
    searchText = search.split(":")[1].split("%20");
  }
  console.log("searchText");
  console.log(searchText);

  const getProductsInfo = () => {
    let ApiURL;
    if (searchType === "categories") {
      ApiURL = `http://localhost:5000/products/${search.split(":")[0]}`;
    } else if (searchType === "hotDeals") {
      console.log("in hotDeals");
      return axios
        .get(`http://localhost:5000/products/all/${searchType}`)
        .then((response) => response.data)
        .catch((error) => null);
    } else {
      ApiURL = `http://localhost:5000/products/all/none`;
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
          for (const product of response) {
            if (
              product.discountPrice <= maxPrice &&
              product.discountPrice >= minPrice
            ) {
              if (searchText !== undefined) {
                let flag = false;
                searchText.forEach((searchWord) => {
                  if (
                    product.tags.split("#").includes(searchWord) ||
                    product.title.split(" ").includes(searchWord)
                  ) {
                    flag = true;
                  }
                });
                if (flag) {
                  tempProducts.push(product);
                }
              } else {
                tempProducts.push(product);
              }
            }
          }
          setProducts(tempProducts);
          setIsLoaded(true);

          // response.forEach((product) => {
          //   if (
          //     product.discountPrice <= maxPrice &&
          //     product.discountPrice >= minPrice
          //   ) {
          //     if (searchText !== undefined) {
          //       let flag = false;
          //       searchText.forEach((searchWord) => {
          //         if (
          //           product.tags.split("#").includes(searchWord) ||
          //           product.title.split(" ").includes(searchWord)
          //         ) {
          //           flag = true;
          //         }
          //       });
          //       if (flag) {
          //         tempProducts.push(product);
          //       }
          //     } else {
          //       tempProducts.push(product);
          //     }
          //   }
          // });
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  useEffect(() => {
    document.title = "BOSS - Search Page";
    // setIsLoaded(false);
    initializeProductData();
    // setTimeout(() => {
    //   setIsLoaded(true);
    // }, 2000);
  }, [minPrice, maxPrice]);

  return (
    <div style={{ display: "flex" }}>
      <AdminFrame />
      <div id="root" style={styles.root}>
        <div style={{ ...styles.wrapper }}>
          <div
            style={{
              ...styles.container,
              width: "80%",
              background: "#FAFAFA",
              // boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              // borderRadius: 3,
              justifyContent: "flex-start",
              // marginTop: 20,
            }}
          >
            <Toolbar />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
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
          <FilterList setMaxPrice={setMaxPrice} setMinPrice={setMinPrice} />
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
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default AdminProducts;
