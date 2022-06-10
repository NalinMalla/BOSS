import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "../screens/signInPage";
import SignUp from "../screens/signUpPage";
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

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="product" element={<ProductPage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="profile" element={<ProfilePage/>} />
        <Route path="profile/addressBook" element={<ProfileAddressBook/>} />
        <Route path="profile/paymentOptions" element={<ProfilePaymentOptions/>} />
        <Route path="profile/passwordReset" element={<ProfilePasswordReset/>} />
        <Route path="orders" element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
