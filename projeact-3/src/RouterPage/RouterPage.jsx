import React from "react";
import { Route, Routes } from "react-router-dom";

import UseInterfacePage from "../Components/UserInterfacePage";
import Login from "../Components/Login+Resigter/Login";
import Resigter from "../Components/Login+Resigter/Resigter";
import HomePage from "../Components/HomePage";
import { useAuth } from "../Components/auth-context";
import Cart from "../Components/Cart/Cart";

function RouterPage() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/resigter" element={<Resigter />}></Route>
        <Route path="/" element={<UseInterfacePage />}></Route>
        <Route path="/homepage" element={<HomePage />}></Route>
        <Route path="/cart" element={<Cart />}></Route>

      </Routes>
    </div>
  );
}

export default RouterPage;
