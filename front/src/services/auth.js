import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

const signUp = (user) => {
  return axios.post("signin", user);
};

export { signUp };
