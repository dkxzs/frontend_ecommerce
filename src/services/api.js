import axios from "../utils/axiosCustomize";

const getAllProduct = () => {
  return axios.get("/product/get-all-product");
};

export { getAllProduct };
