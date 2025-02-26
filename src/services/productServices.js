import axios from "../utils/axiosCustomize";

const getAllProduct = async () => {
  const res = await axios.get("/product/get-all-product");
  return res.data;
};

export { getAllProduct };
