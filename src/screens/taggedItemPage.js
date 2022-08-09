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

import Colors from "../res/colors";
import ProductList from "../components/productList";

const TaggedItemPage = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const [products, setProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
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

  // function initializeProductData(userId) {
  //   getTaggedItemById(userId).then((response) => {
  //     if (response === null) {
  //       navigate("/signIn");
  //     } else {
  //       console.log(userId, "'s Tagged Items Info");
  //       console.log(response);
  //       console.log("Items");
  //       console.log(response.products);

  //       var tempProducts = [];
  //       response.products.forEach((element, index) => {
  //         console.log(index, " For item ", element);
  //         getProductInfoById(element)
  //           .then((response) => {
  //             if (response !== null) {
  //               tempProducts.push(response);
  //             }
  //           })
  //           .catch((err) => {
  //             console.log("Error", err);
  //           });
  //       });
  //       setProducts(tempProducts);
  //     }
  //   });
  // }

  const initializeProductData = (userId) => {
    getTaggedItemById(userId)
      .then((response) => {
        console.log("Get Tagged item by id.");
        console.log(response.products);

        if (response === null) {
          navigate("/signIn");
        } else {
          var tempProducts = [];
          response.products.forEach((element, index) => {
            getProductInfoById(element)
              .then((response) => {
                if (response !== null) {
                  tempProducts[index] = response;
                }
              })
              .catch((err) => {
                console.log("Error", err);
              });
          });
          setProducts(tempProducts);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setTimeout(() => {setIsLoaded(true)}, 2000);
    document.title = "BOSS - Tagged Item Page";
    if (userId === undefined) {
      navigate("/");
    } else if (products.length === 0) {
      initializeProductData(userId);
    }
  }, []);

  useEffect(() => {

    if (products.length > 0) {
      setIsLoaded(true);
    }
    else{
      setIsLoaded(false);
    }
  }, [products]);


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
            {!isLoaded ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  marginTop: 20
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
                <div style={{fontSize: 22, fontWeight: 500, marginTop: 10}}>Loading...</div>
              </div>
            ) : (
              <ProductList
                counterDisabled={true}
                counterDisplay={"none"}
                products={JSON.stringify(products)}
                // products={products}
              />
            )}
            {/* {console.log("products")}
            {console.log(products)}
            {console.log(JSON.stringify(products))} */}
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
