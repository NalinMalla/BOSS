import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "../screens/signInPage";
import SignUp from "../screens/signUp";
import Home from "../screens/home";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="signIn" element={<SignIn />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;