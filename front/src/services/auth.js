import axios from "axios";

const getToken = () => {
  const user  = JSON.parse(localStorage.getItem("user"));
  if(!user) return null;
  return user.token ? `Bearer ${user.token}` : null;
};

const signUp = (user) => {
  return axios.post("signin", user);
};

const login = (user) => {
  return axios.post("login", user);
};

export { getToken, signUp, login };
