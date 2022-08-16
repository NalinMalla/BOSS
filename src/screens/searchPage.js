import * as React from "react";
import { Audio } from "react-loader-spinner";
import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../components/header";
import NavBar from "../components/navBar";
import ProductGrid from "../components/productGrid";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import SignIn from "../components/signIn";
import CustomModal from "../components/CustomModal";
import FilterList from "../components/filterList";
import ProductList from "../components/productList";

import Colors from "../res/colors";

const SearchPage = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

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

  const getProductInfo = () => {
    let ApiURL;

    if (search1 === "all") {
      ApiURL = `http://localhost:5000/products/all`;
    }

    if (search1 === "categories") {
      ApiURL = `http://localhost:5000/products/${search}`;
    }

    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  function initializeProductData() {
    getProductInfo()
      .then((response) => {
        if (response !== null) {
          setProducts(response);
        }
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }

  useEffect(() => {
    document.title = "BOSS - Search Page";
    initializeProductData(search2);
    setTimeout(() => {
      setIsLoaded(true);
    }, 2000);
  }, []);

  console.log(products);
  console.log(minPrice);
  console.log(maxPrice);

  return (
    <div id="root" style={styles.root}>
      <Header handleSignIn={handleOpenModal} />
      <NavBar />
      <div style={styles.wrapper}>
        <FilterList setMaxPrice={setMaxPrice} setMinPrice={setMinPrice}/>
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
