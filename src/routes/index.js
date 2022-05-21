import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "../screens/signInPage";
import Login from "../screens/login1";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;