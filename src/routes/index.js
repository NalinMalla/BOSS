import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignInPage from "../screens/signInPage";
import SignIn from "../components/signIn";
import SignUp from "../screens/signUpPage";
import Logout from "../components/logout";
import HomePage from "../screens/homePage";
import ProductPage from "../screens/productPage";
import SearchPage from "../screens/searchPage";
import CartPage from "../screens/cartPage";
import CheckoutPage from "../screens/checkoutPage";
import ProfilePage from "../screens/profilePage";
import ProfileAddressBook from "../screens/profileAddressBook";
import ProfilePaymentOptions from "../screens/profilePaymentOptions";
import ProfilePasswordReset from "../screens/profilePasswordReset";
import OrdersPage from "../screens/ordersPage";
import ProductAddPage from "../screens/productAddPage";
import TaggedItemPage from "../screens/taggedItemPage";
import Dashboard from "../screens/dashboard";
import Header from "../components/header";
import NavBar from "../components/navBar";

import CustomModal from "../components/CustomModal";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";

import Colors from "../res/colors";

const Router = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <BrowserRouter>
      {window.location.href !== "http://localhost:3000/signUp" &&
      window.location.href !== "http://localhost:3000/signIn" ? (
        <div>
          <Header handleSignIn={handleOpenModal} />
          <NavBar />
        </div>
      ) : (
        <span style={{ display: "none" }}></span>
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signIn" element={<SignInPage />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="logOut" element={<Logout />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="profile/addressBook" element={<ProfileAddressBook />} />
        <Route
          path="profile/paymentOptions"
          element={<ProfilePaymentOptions />}
        />
        <Route
          path="profile/passwordReset"
          element={<ProfilePasswordReset />}
        />
        <Route path="profile/orders" element={<OrdersPage />} />
        <Route path="profile/taggedItem" element={<TaggedItemPage />} />
        <Route path="product/add" element={<ProductAddPage />} />
        <Route path="admin" element={<Dashboard />} />
      </Routes>

      {window.location.href !== "http://localhost:3000/signUp" &&
      window.location.href !== "http://localhost:3000/signIn" ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Colors.primary,
            width: "100%",
            marginTop: 60,
          }}
        >
          <SiteMap />
          <Copyright />
        </div>
      ) : (
        <span style={{ display: "none" }}></span>
      )}

      <CustomModal
        open={openModal}
        onClose={handleCloseModal}
        component={<SignIn />}
      />
    </BrowserRouter>
  );
};

export default Router;
