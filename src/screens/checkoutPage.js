import * as React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Header from "../components/header";
import NavBar from "../components/navBar";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import SignIn from "../components/signIn";
import CustomModal from "../components/CustomModal";
import Checkout from "../components/checkout";


import Colors from "../res/colors";

const CheckoutPage = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  let navigate = useNavigate();

  const order = window.location.href.split("?")[1];
  // for(let index = 0; i < order.length; i++)
  // {
  //   if(index%2 === 0)
  //   {
  //     product
  //   }
  // }
  const productId = order.split("&")[0];
  const quantity = order.split("&")[1];
  console.log(productId);
  console.log(quantity);

  const [title, setTitle] = React.useState("");
  const [discountPrice, setDiscountPrice] = React.useState("");
  const [discountRate, setDiscountRate] = React.useState("");
  const [price, setPrice] = React.useState("");

  const getProductInfoById = (productId) => {
    const ApiURL = `http://localhost:5000/products/${productId}`;
    return axios
      .get(ApiURL)
      .then((response) => response.data)
      .catch((error) => null);
  };

  async function initializeProductData(productId) {
    const productInfo = await getProductInfoById(productId);
    if (productInfo === null) {
      alert("Error: Unable to access server.");
    } else {
      setTitle(productInfo.title);
      setPrice(productInfo.price);
      setDiscountPrice(productInfo.discountPrice);
      if (productInfo.discountRate !== undefined) {
        setDiscountRate(productInfo.discountRate);
      }
    }
  }

  React.useEffect(() => {
    document.title = "BOSS - Checkout Page";
    if (productId === "" || quantity === "" || productId === undefined || quantity === undefined) {
      navigate("/cart");
    } else {
      initializeProductData(productId); //wouldn't work without async await?
    }
  }, []);


  let grossTotalPrice = quantity * discountPrice;
  let shippingFee = 2000;
  let netTotalPrice = grossTotalPrice + shippingFee;

  return (
    <div id="root" style={styles.root}>
      <Header handleSignIn={handleOpenModal} />
      <NavBar />
      
      <div
        style={{
          ...styles.wrapper,
          justifyContent: "space-between",
          marginTop: 20,
          flex: 1,
        }}
      >
        <div style={{display: 'flex',flex:0.65,}}>
          <Checkout/>
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
              width: "89%",
              borderRadius: 3,
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
              padding: 20,
            }}
          >
            <span
              style={{ fontSize: 28, color: Colors.primary }}
            >
              Order Summary
            </span>

            <div
              style={{
                ...styles.wrapper,
                justifyContent: "space-between",
                fontSize: 18,
                marginTop: 10,
                width: '100%',
              }}
            >
              <span>Gross Total ({quantity} items) :</span>
              <span>Rs. {grossTotalPrice}</span>
            </div>

            <div
              style={{
                ...styles.wrapper,
                justifyContent: "space-between",
                fontSize: 18,
                marginTop: 10,
                width: '100%',
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
                width: '100%',
              }}
            >
              <span>Net Total :</span>
              <span>Rs. {netTotalPrice}</span>
            </div>
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
