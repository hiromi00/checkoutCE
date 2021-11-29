import axios from "axios";

const getCart = () => {
  return axios.get("checkout");
};

const sellProducts = () => {
  return axios.post("checkout/sell");
};

export { getCart, sellProducts };
