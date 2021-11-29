import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

const signUp = (user) => {
  return axios.post("signin", user);
};

const login = (user) => {
  return axios.post("login", user);
};

export { signUp, login };
