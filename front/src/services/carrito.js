import axios from "axios";

const getCart = () => {
    return axios.get("checkout")
}

export { getCart };