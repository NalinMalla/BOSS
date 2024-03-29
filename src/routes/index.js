import React from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

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
import OrdersPage from "../screens/userOrdersPage";
import ProductAddPage from "../screens/productAddPage";
import ProductUpdatePage from "../screens/productUpdatePage";
import TaggedItemPage from "../screens/taggedItemPage";
// import Dashboard from "../screens/dashboard";
import Header from "../components/header";
import NavBar from "../components/navBar";
import CustomModal from "../components/CustomModal";
import SiteMap from "../components/siteMap";
import Copyright from "../components/copyright";
import AdminOrders from "../screens/adminOrders";
import AdminProducts from "../screens/adminProducts";
import OrderPage from "../screens/orderPage";
import OrderReturnPage from "../screens/userOrderReturnPage";
import OrderCancelledPage from "../screens/userOrderCancelledPage";
import ReviewPage from "../screens/userReviewPage";

import Colors from "../res/colors";

function CopyrightWaterMark(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://bira.com.np/" underline="hover">
        BIRA Builders & Suppliers PVT. LTD.
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Router = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const isAdmin = useSelector((state) => state.isAdmin.isAdmin);

  console.log("isAdmin");
  console.log(isAdmin);

  return isAdmin ? (
    <div style={{height: "100vh"}}>
      <BrowserRouter>
        {/* <div style={{ display: "flex" }}>
          <AdminFrame />  */}
          <Routes>
            {/* <Route path="/" element={<Dashboard />} /> */}
            <Route path="logOut" element={<Logout />} />
            <Route path="/" element={<AdminOrders />} />
            <Route path="order" element={<OrderPage />} />
            <Route path="product/add" element={<ProductAddPage />} />
            <Route path="product/update" element={<ProductUpdatePage />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        {/* </div> */}
        <CopyrightWaterMark sx={{ pt: 4, pb: 2}} />
      </BrowserRouter>
    </div>
  ) : (
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
        <Route path="/" element={<HomePage />}></Route>
        <Route path="signUp" element={<SignUp />} />
        <Route path="signIn" element={<SignInPage />} />
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
        <Route path="profile/orders/returns" element={<OrderReturnPage />} />
        <Route path="profile/orders/cancellations" element={<OrderCancelledPage />} />
        <Route path="profile/reviews" element={<ReviewPage />} />
        <Route path="profile/taggedItem" element={<TaggedItemPage />} />
        <Route path="*" element={<Navigate to="/" />} />
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
