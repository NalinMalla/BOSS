import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "../screens/signInPage";
import SignUp from "../screens/signUp";
import HomePage from "../screens/homePage";
import ProductPage from "../screens/productPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="home" element={<HomePage />} />
        <Route path="product" element={<ProductPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;