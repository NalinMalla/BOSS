import * as React from "react";
import {useState, useEffect} from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/header";
import NavBar from "../components/navBar";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import SignIn from "../components/signIn";
import CustomModal from "../components/CustomModal";
import ProfileList from "../components/profileList";
import ProfileHead from "../components/profileHead";

import Colors from "../res/colors";
import ProductList from "../components/productList";

const TaggedItemPage = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [products, setProducts] = useState(null);
  let navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  const getProductInfoById = (productId) => {
    const ApiURL = `http://localhost:5000/products/${productId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  const getTaggedItemById = (userId) => {
    const ApiURL = `http://localhost:5000/users/taggedItem/${userId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  function initializeProductData(userId) {
    getTaggedItemById(userId).then((response) => {
      if (response === null) {
        alert("No taggedItem created for this user.");
      } else {
        console.log(userId, "'s Tagged Items Info");
        console.log(response);
        console.log("Items");
        console.log(response.products);

        var tempProducts = [];
        response.products.forEach((element, index) => {
          console.log(index, ' For item ', element);
          getProductInfoById(element)
            .then((response) => {
              if (response !== null) {
                tempProducts.push(response);
              }
            })
            .catch((err) => {
              console.log("Error", err);
            });
        });
        setProducts(tempProducts);
      }
    });
  }

 
  useEffect(() => {
    console.log("products");
    console.log(products);
  }, [products]);

  useEffect(() => {
    document.title = "BOSS - Tagged Item Page";
    if (userId === undefined) {
      navigate("/");
    } else if(products === null) {
      initializeProductData(userId);
    }
  }, []);

  return (
    <div id="root" style={styles.root}>
      <Header handleSignIn={handleOpenModal} />
      <NavBar />
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
            <ProductList counterDisabled={true} counterDisplay={"none"} />
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
