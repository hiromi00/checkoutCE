import { useState, useEffect } from "react";
import "./App.css";
import Login from "./views/Login";
import AppBar from "./views/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import Checkout from "./views/Checkout";
import SignUp from "./views/SignUp";
import Catalog from "./views/Catalog";
import ShoppingCart from "./views/ShoppingCart";
import Orders from "./views/Orders";
import Specs from "./views/Specs";
import axios from "axios";

function App() {
  const [shoppingCart, setShoppingCart] = useState(0);
  
  // Wrapper para <Route> que redirige al login si no se está autenticado
  const PrivateRoute = ({ children }) =>
    JSON.parse(localStorage.getItem(`user`)) ? (
      <>{children}</>
    ) : (
      <Navigate to="/login" replace={true} />
    );

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route
          path="checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <AppBar shoppingCart={shoppingCart}>
                <Catalog setShoppingCart={setShoppingCart}/>
              </AppBar>
            </PrivateRoute>
          }
        />
        <Route
          path="shopping_cart"
          element={
            <PrivateRoute>
              <AppBar shoppingCart={shoppingCart}>
                <ShoppingCart />
              </AppBar>
            </PrivateRoute>
          }
        />
        <Route
          path="orders"
          element={
            <PrivateRoute>
              <AppBar shoppingCart={shoppingCart}>
                <Orders />
              </AppBar>
            </PrivateRoute>
          }
        />
        <Route
          path="specs"
          element={
            <AppBar shoppingCart={shoppingCart}>
              <Specs />
            </AppBar>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
