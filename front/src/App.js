import "./App.css";
import Login from "./views/Login";
import Home from "./views/Home";
import { Routes, Route } from "react-router-dom";
import Checkout from "./views/Checkout";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
