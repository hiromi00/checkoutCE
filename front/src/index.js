import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import { getToken } from "./services/auth";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL ?? `https://5aca-187-189-190-187.ngrok.io/`;

axios.interceptors.request.use(function (config) {
  config.headers.Authorization = getToken();
  return config;
});

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
