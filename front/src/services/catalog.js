import axios from "axios";

const getCatalog = () => {
  return axios.get("sneakers");
};

const cart = (sneaker) => {
    return axios.post("checkout", sneaker);
  };

export { getCatalog, cart};
