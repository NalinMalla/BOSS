import * as React from "react";
import { Button } from "@mui/material";

import Header from "../components/header";
import NavBar from "../components/navBar";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import SignIn from "../components/signIn";
import CustomModal from "../components/CustomModal";
import ProductList from "../components/productList";

import Colors from "../res/colors";


const CartPage = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  let items = 3;
  let grossTotalPrice = 5500000;
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
        }}
      >
        <div style={{ ...styles.wrapper, flex: 0.65 }}>
          <ProductList />
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
            <span
              style={{ fontSize: 28,  color: Colors.primary }}
            >
              Order Summary
            </span>

            <div
              style={{
                ...styles.wrapper,
                justifyContent: "space-between",
                fontSize: 20,
                marginTop: 10,
                width: '100%',
              }}
            >
              <span>Gross Total ({items} items) :</span>
              <span>Rs. {grossTotalPrice}</span>
            </div>

            <div
              style={{
                ...styles.wrapper,
                justifyContent: "space-between",
                fontSize: 20,
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

            <Button
              size="large"
              fullWidth
              variant="contained"
              style={{ marginTop: 20 }}
              href="checkout"
            >
              PROCEED TO CHECKOUT
            </Button>
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
