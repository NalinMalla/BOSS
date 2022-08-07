import * as React from "react";
import Avatar from "@mui/material/Avatar";

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

const OrdersPage = (props) => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <div id="root" style={styles.root}>
      <Header handleSignIn={handleOpenModal} />
      <NavBar />
      <div
        style={{
          ...styles.wrapper,
          width: "92%",
          flex: 1,
          justifyContent: "space-between",
          marginTop: 20,
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
          <div
            style={{
              ...styles.container,
              width: "90%",
              alignItems: "flex-start",
            }}
          >
            <div style={{ ...styles.wrapper, justifyContent: "space-between" }}>
              <span
                style={{ color: Colors.primary, fontSize: 24, marginTop: 10 }}
              >
                Order #{props.orderNum}
              </span>
              <span
                style={{ color: Colors.secondary, fontSize: 24, marginTop: 10 }}
              >
                Total: {props.totalPrice}
              </span>
            </div>
            <span
              style={{
                color: Colors.secondary,
                marginBottom: 15,
                marginLeft: 2,
              }}
            >
              Placed on {props.dateTime}
            </span>
            <ProductList counterDisabled={true} />
            <hr style={{ width: "100%" }} />
          </div>

          <div
            style={{
              ...styles.container,
              width: "90%",
              alignItems: "flex-start",
            }}
          >
            <div style={{ ...styles.wrapper, justifyContent: "space-between" }}>
              <span
                style={{ color: Colors.primary, fontSize: 24, marginTop: 10 }}
              >
                Order #{props.orderNum}
              </span>
              <span
                style={{ color: Colors.secondary, fontSize: 24, marginTop: 10 }}
              >
                Total: {props.totalPrice}
              </span>
            </div>
            <span
              style={{
                color: Colors.secondary,
                marginBottom: 15,
                marginLeft: 2,
              }}
            >
              Placed on {props.dateTime}
            </span>
            <ProductList counterDisabled={true} />
            <hr style={{ width: "100%" }} />
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
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default OrdersPage;
