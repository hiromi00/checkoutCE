import axios from "axios";

const getToken = () => {

  const { token } = JSON.parse(localStorage.getItem("user"));
  return token ? `Bearer ${token}` : null;
};

const signUp = (user) => {
  return axios.post("signin", user);
};

const login = (user) => {
  return axios.post("login", user);
};

export { getToken, signUp, login };
