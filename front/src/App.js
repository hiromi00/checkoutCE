import { useState } from "react";
import "./App.css";
import Login from "./views/Login";
import AppBar from "./views/Home";
import { Routes, Route } from "react-router-dom";
import Checkout from "./views/Checkout";
import SignUp from "./views/SignUp";
import Catalog from "./views/Catalog";
import ShoppingCart from "./views/ShoppingCart";
import Orders from "./views/Orders";
import Specs from './views/Specs'

function App() {
  const [shoppingCart, setShoppingCart] = useState([`una gorda`, `joto`]);

  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="checkout" element={<Checkout />} />
        <Route
          path="/"
          element={
            <AppBar shoppingCart={shoppingCart}>
              <Catalog />
            </AppBar>
          }
        />
        <Route
          path="shopping_cart"
          element={
            <AppBar shoppingCart={shoppingCart}>
              <ShoppingCart />
            </AppBar>
          }
        />
        <Route
          path="orders"
          element={
            <AppBar shoppingCart={shoppingCart}>
              <Orders />
            </AppBar>
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
