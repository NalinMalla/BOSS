import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "../screens/signInPage";
import SignUp from "../screens/signUp";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="signIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;